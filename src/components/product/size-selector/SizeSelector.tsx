import type { Size } from '@/interfaces'
import clsx from 'clsx'

interface Props {
  selectedSize?: Size
  availableSizes: Size[]

  onSizeSelected: (size: Size) => void
}

export default function SizeSelector({ selectedSize, availableSizes, onSizeSelected }: Props) {
  return (
    <div className='mt-5'>
      <h3 className='font-bold mb-1'>Available Sizes</h3>

      <div className='flex'>
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelected(size)}
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
