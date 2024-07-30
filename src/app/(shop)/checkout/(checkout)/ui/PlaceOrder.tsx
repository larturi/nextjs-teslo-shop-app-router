'use client'

import { placeOrder } from '@/actions'
import { useAddressStore, useCartStore } from '@/store'
import { currencyFormater } from '@/utils'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

export default function PlaceOrder() {
  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showErrorMsg, setShowErrorMsg] = useState('')
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const address = useAddressStore((state) => state.address)

  const { subTotal, tax, total, itemsInCart } = useCartStore((state) =>
    state.getSummaryInformation()
  )

  const cart = useCartStore((state) => state.cart)

  useEffect(() => {
    setLoading(true)
  }, [])

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true)

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size
    }))

    const resp = await placeOrder(productsToOrder, address)
    console.log(resp)

    if (!resp.ok) {
      setShowError(true)
      setShowErrorMsg(resp.message!.toString())
    }

    setIsPlacingOrder(false)
  }

  if (!loading) return <p>Loading...</p>

  return (
    <div className='bg-white rounded-xl shadow-xl p-7'>
      <h2 className='text-2xl mb-2'>Delivery address</h2>
      <div className='mb-10'>
        <p>
          Receiver: {address.firstName} {address.lastName}
        </p>
        <p>Address: {address.address}</p>
        <p>City: {address.city}</p>
        <p>CP: {address.postalCode}</p>
        <p>Phone: {address.phone}</p>
      </div>

      <div className='w-full h-0.5 rounded bg-gray-300 mb-10' />

      <h2 className='text-2xl mb-2'>Order Summary</h2>

      <div className='grid grid-cols-2'>
        <span>No. Products</span>
        <span className='text-right'>{itemsInCart}</span>

        <span>Subtotal</span>
        <span className='text-right'>{currencyFormater(subTotal)}</span>

        <span>Taxes</span>
        <span className='text-right'>{currencyFormater(tax)}</span>

        <span className='mt-5 text-2xl'>Total</span>
        <span className='mt-5 text-2xl text-right'>{currencyFormater(total)}</span>
      </div>

      <div className='mt-5 mb-2 w-full'>
        <p className='mb-5'>
          <span className='text-xs'>
            By clicking you confirm our{' '}
            <a className='underline' href='#' target='_blank' rel='noopener noreferrer'>
              terms and conditions
            </a>
            <span> and </span>
            <a className='underline' href='#' target='_blank' rel='noopener noreferrer'>
              privacy policy
            </a>
            <span>.</span>
          </span>
        </p>

        {showError && (
          <p className='bg-red-500 text-white text-center rounded-md py-2 mb-4'>{showErrorMsg}</p>
        )}

        <button
          onClick={onPlaceOrder}
          className={clsx(
            'flex justify-center w-full',
            { 'btn-disabled': isPlacingOrder },
            { 'btn-primary': !isPlacingOrder }
          )}
        >
          {/* href='/orders/123' */}
          Confirm Order
        </button>
      </div>
    </div>
  )
}
