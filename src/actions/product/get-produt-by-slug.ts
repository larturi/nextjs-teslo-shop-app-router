'use server'

import prisma from '@/lib/prisma'

interface Props {
  slug: string
}

export default async function getProductBySlug({ slug }: Props) {
  try {
    const product = await prisma.product.findUnique({
      include: {
        productImage: {
          select: {
            url: true
          }
        }
      },
      where: {
        slug: slug
      }
    })

    if (!product) return null

    return {
      ...product,
      images: product.productImage.map((image) => image.url)
    }
  } catch (error) {
    console.log(error)
    throw new Error('Error al carga el producto con slug ' + slug)
  }
}
