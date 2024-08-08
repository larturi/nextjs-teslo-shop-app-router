'use client'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveActions,
  OnApproveData
} from '@paypal/paypal-js'
import { paypalCheckPayment, setTransactionId } from '@/actions'

interface Props {
  orderId: string
  amount: number
}

export function PayPalButton({ orderId, amount }: Props) {
  const [{ isPending }] = usePayPalScriptReducer()

  const roundedAmount = Math.round(amount * 100) / 100 //123.23

  if (isPending) {
    return (
      <div className='animate-pulse mb-16'>
        <div className='h-[45px] bg-gray-300 rounded'></div>
        <div className='h-[45px] bg-gray-300 rounded mt-4'></div>
      </div>
    )
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            currency_code: 'USD',
            value: `${roundedAmount}`
          }
        }
      ]
    })

    // console.log(transactionId)

    const { ok } = await setTransactionId(orderId, transactionId)
    if (!ok) {
      throw new Error('No se pudo actualizar la orden')
    }

    return transactionId
  }

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    console.log('onApprove')
    const details = await actions.order?.capture()
    if (!details) return
    console.log(details.id)
    await paypalCheckPayment(details.id!)
  }

  return (
    <div className='relative z-0'>
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  )
}
