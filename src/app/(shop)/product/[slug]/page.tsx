import { SizeSelector, QuantitySelector, ProductSlideshow } from '@/components'
import { titleFont } from '@/config/fonts'
import { initialData } from '@/seed/seed'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: Props) {
  const { slug } = params
  const product = initialData.products.find((product) => product.slug === slug)

  if (!product) return notFound()

  return (
    <div className='mt-5 mb-20 grid grid-cols-1 md:grid-cols-6 gap-3'>
      {/* Slideshow */}
      <div className='col-span-1 md:col-span-3'>
        <ProductSlideshow images={product.images} title={product.title} />
      </div>

      {/* Details */}
      <div className='col-span-2 px-3 '>
        <h1 className={`${titleFont.className} antialiased font-bold text-4xl mb-7`}>
          {product.title}
        </h1>
        <p className='text-lg mb-5'>${product.price}</p>

        <SizeSelector availableSizes={product.sizes} selectedSize={product.sizes[0]} />

        <QuantitySelector quantity={1} />

        {/* Add to cart */}
        <button className='btn-primary my-5'>Add to Cart</button>

        {/* Description */}
        <h3 className='font-bold text-sm'>Description</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  )
}
