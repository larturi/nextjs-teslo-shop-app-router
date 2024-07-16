'use client'

import { SizeSelector, QuantitySelector } from '@/components'
import { CartProduct, Product, Size } from '@/interfaces'
import { useCartStore } from '@/store'
import { useState } from 'react'

interface Props {
  product: Product
}

export default function AddToCart({ product }: Props) {
  const addProductToCart = useCartStore((state) => state.addProductToCart)

  const [size, setSize] = useState<Size | undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [posted, setPosted] = useState<boolean>(false)

  const addToCart = () => {
    setPosted(true)
    if (!size || !quantity) return

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0]
    }
    addProductToCart(cartProduct)
    setPosted(false)
    setQuantity(1)
    setSize(undefined)
  }

  return (
    <>
      <SizeSelector
        availableSizes={product.sizes}
        selectedSize={size}
        onSizeSelected={(size) => setSize(size)}
      />

      {posted && !size && (
        <span className='text-red-500 text-sm'>Debe seleccionar una talla (*)</span>
      )}

      <QuantitySelector
        quantity={quantity}
        onQuantityChanged={(quantity) => setQuantity(quantity)}
      />

      <button onClick={addToCart} className='btn-primary my-5'>
        Add to Cart
      </button>
    </>
  )
}
