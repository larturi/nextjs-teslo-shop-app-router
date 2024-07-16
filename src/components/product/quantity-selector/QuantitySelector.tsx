'use client'

import { useState } from 'react'
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'

interface Props {
  quantity: number

  onQuantityChanged: (quantity: number) => void
}

export default function QuantitySelector({ quantity, onQuantityChanged }: Props) {
  const onValueChange = (value: number) => {
    if (quantity + value < 1) return

    onQuantityChanged(quantity + value)
  }

  return (
    <div className='mt-6'>
      <div className='flex'>
        <button className='mr-3 hover:underline text-lg' onClick={() => onValueChange(-1)}>
          <IoRemoveCircleOutline size={30} />
        </button>
        <span className='w-10 text-center text-lg'>{quantity}</span>
        <button className='ml-3 hover:underline text-lg' onClick={() => onValueChange(+1)}>
          <IoAddCircleOutline size={30} />
        </button>
      </div>
    </div>
  )
}
