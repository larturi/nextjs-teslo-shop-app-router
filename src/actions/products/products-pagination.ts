'use server'

import prisma from '@/lib/prisma'
import { Gender } from '@prisma/client'

interface PaginationOptions {
  page?: number
  take?: number
  gender?: Gender
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender
}: PaginationOptions) => {
  if (isNaN(Number(page)) || page < 1) page = 1
  if (isNaN(Number(take)) || take < 1) take = 12

  try {
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        productImage: {
          take: take,
          select: {
            url: true
          }
        }
      },
      // Por género
      where: {
        gender: gender
      }
    })

    // Obtener el total de paginas
    const totalCount = await prisma.product.count({
      where: {
        gender: gender
      }
    })
    const totalPages = Math.ceil(totalCount / take)

    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.productImage.map((image) => image.url)
      }))
    }
  } catch (error) {
    console.log(error)
    throw new Error('Error al cargar los productos')
  }
}
