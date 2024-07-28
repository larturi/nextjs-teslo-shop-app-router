'use client'

import { useCartStore } from '@/store'
import { currencyFormater } from '@/utils'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ProductsInCart() {
  const productsInCart = useCartStore((state) => state.cart)
  const getTotalItems = useCartStore((state) => state.getTotalItems())

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <p>Loading...</p>
  }

  if (loaded && getTotalItems === 0) {
    redirect('/empty')
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className='flex mb-5'>
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={30}
            alt={product.title}
            className='mr-5 rounded'
            style={{
              width: '160px',
              height: '160px',
              border: '1px solid #f1f1f1',
              padding: '3px'
            }}
          />

          <div>
            <span className='font-bold text-gray-700 text-sm'>
              <p className='mb-3'>
                {product.title} ({product.quantity})
              </p>
            </span>

            <p className='font-bold'>{currencyFormater(product.price * product.quantity)}</p>
          </div>
        </div>
      ))}
    </>
  )
}
