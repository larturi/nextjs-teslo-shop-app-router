import type { Size } from '@/interfaces'
import clsx from 'clsx'

interface Props {
  selectedSize?: Size
  availableSizes: Size[]
}

export default function SizeSelector({ selectedSize, availableSizes }: Props) {
  return (
    <div className='my-5'>
      <h3 className='font-bold mb-4'>Available Sizes</h3>

      <div className='flex'>
        {availableSizes.map((size) => (
          <button
            key={size}
            className={clsx('mr-4 hover:underline text-lg', {
              underline: size === selectedSize
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
