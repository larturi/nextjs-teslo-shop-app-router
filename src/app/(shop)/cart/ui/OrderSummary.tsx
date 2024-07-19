'use client'

import { useCartStore } from '@/store'
import { currencyFormater } from '@/utils'
import { useEffect, useState } from 'react'

export default function OrderSummary() {
  const [loaded, setLoaded] = useState(false)

  const { subTotal, tax, total, itemsInCart } = useCartStore((state) =>
    state.getSummaryInformation()
  )

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <p>Loading...</p>
  }

  return (
    <>
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
    </>
  )
}
