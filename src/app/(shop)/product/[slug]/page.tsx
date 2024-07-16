export const revalidate = 604800 // 7 dias

import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/actions'
import { titleFont } from '@/config/fonts'
import AddToCart from './ui/AddToCart'

import { ProductSlideshow, ProductMobileSlideshow, StockLabel } from '@/components'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug

  // fetch data
  const product = await getProductBySlug({ slug })

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? '',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? '',
      description: product?.description ?? '',
      images: [`/products/${product?.images[1]}`]
    }
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params

  const product = await getProductBySlug({ slug })
  if (!product) return notFound()

  return (
    <div className='mt-5 mb-20 grid grid-cols-1 md:grid-cols-6 sm:gap-3 gap-x-0 gap-y-5'>
      {/* Slideshow */}
      <div className='col-span-1 md:col-span-3'>
        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          images={product.images}
          title={product.title}
          className='block md:hidden'
        />

        {/* Desktop Slideshow */}
        <ProductSlideshow
          images={product.images}
          title={product.title}
          className='hidden md:block'
        />
      </div>

      {/* Details */}
      <div className='col-span-3 px-3 '>
        <h1 className={`${titleFont.className} antialiased font-bold text-4xl mb-5`}>
          {product.title}
        </h1>

        <p className='font-bold text-4xl mb-5'>${product.price}</p>

        <StockLabel slug={product.slug} />

        <AddToCart product={product} />

        {/* Description */}
        <h3 className='font-bold text-sm'>Description</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  )
}
