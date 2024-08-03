'use server'

import prisma from '@/lib/prisma'

import { auth } from '@/auth.config'

export const getOrdersBySessionUser = async () => {
  const session = await auth()
  const userId = session?.user.id

  // Verificar sesión de usuario
  if (!userId) {
    return {
      ok: false,
      message: 'No hay sesión de usuario'
    }
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId
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

    return { ok: true, orders }
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Error al obtener las ordenes'
    }
  }
}
