'use client'

import { useState } from 'react'
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'

interface Props {
  quantity: number
}

export function QuantitySelector({ quantity }: Props) {
  const [count, setCount] = useState(quantity)

  const onQuantityChange = (value: number) => {
    if (count + value < 1) return

    setCount(count + value)
  }

  return (
    <div className='my-3'>
      <div className='flex'>
        <button className='mr-3 hover:underline text-lg' onClick={() => onQuantityChange(-1)}>
          <IoRemoveCircleOutline size={30} />
        </button>
        <span className='w-10 text-center text-lg'>{count}</span>
        <button className='ml-3 hover:underline text-lg' onClick={() => onQuantityChange(+1)}>
          <IoAddCircleOutline size={30} />
        </button>
      </div>
    </div>
  )
}
