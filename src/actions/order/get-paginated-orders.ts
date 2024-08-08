'use server'

import prisma from '@/lib/prisma'

import { auth } from '@/auth.config'

interface PaginationOptions {
  page?: number
  take?: number
}

export const getPaginatedOrders = async ({ page = 1, take = 12 }: PaginationOptions) => {
  if (isNaN(Number(page)) || page < 1) page = 1
  if (isNaN(Number(take)) || take < 1) take = 12

  const session = await auth()

  // Verificar sesión de usuario
  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'El usuario debe ser Administrador'
    }
  }

  try {
    const orders = await prisma.order.findMany({
      take: take,
      skip: (page - 1) * take,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    })

    // Obtener el total de paginas
    const totalCount = await prisma.order.count()
    const totalPages = Math.ceil(totalCount / take)

    return { ok: true, orders, totalPages }
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Error al obtener las ordenes',
      totalPages: 0
    }
  }
}
