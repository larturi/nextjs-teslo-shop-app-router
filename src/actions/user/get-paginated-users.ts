'use server'

import prisma from '@/lib/prisma'

import { auth } from '@/auth.config'

interface PaginationOptions {
  page?: number
  take?: number
}

export const getPaginatedUsers = async ({ page = 1, take = 12 }: PaginationOptions) => {
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
    const users = await prisma.user.findMany({
      take: take,
      skip: (page - 1) * take,
      orderBy: {
        name: 'asc'
      }
    })

    // Obtener el total de paginas
    const totalCount = await prisma.user.count()
    const totalPages = Math.ceil(totalCount / take)

    return { ok: true, users, totalPages }
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Error al obtener los usuarios',
      totalPages: 0
    }
  }
}
