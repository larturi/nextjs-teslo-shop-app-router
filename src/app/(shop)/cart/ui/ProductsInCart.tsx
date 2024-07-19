'use client'

import { QuantitySelector } from '@/components'
import { useCartStore } from '@/store'
import { Sleep } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ProductsInCart() {
  const productsInCart = useCartStore((state) => state.cart)
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity)
  const removeProduct = useCartStore((state) => state.removeProduct)
  const getTotalItems = useCartStore((state) => state.getTotalItems())

  Sleep(1)

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
            <Link
              href={`/product/${product.slug}`}
              className='hover:underline cursor-pointer font-bold text-gray-700 text-sm'
            >
              <p className='mb-3'>{product.title}</p>
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(value) => updateProductQuantity(product, value)}
            />

            <button className='underline mt-3' onClick={() => removeProduct(product)}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
