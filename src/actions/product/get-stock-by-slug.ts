'use server'

import prisma from '@/lib/prisma'

export default async function getStockBySlug(slug: string): Promise<number> {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: slug },
      select: { inStock: true }
    })

    if (!product) return 0

    return product?.inStock || 0
  } catch (error) {
    return 0
  }
}
