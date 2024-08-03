'use server'

import prisma from '@/lib/prisma'

import { auth } from '@/auth.config'

export const getOrderById = async (id: string) => {
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
    const order = await prisma.order.findFirst({
      where: {
        id,
        userId
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,

                productImage: {
                  select: {
                    url: true
                  },
                  take: 1
                }
              }
            }
          }
        }
      }
    })

    if (!order) throw `${id} not exists`

    if (session.user.role === 'user') {
      if (session.user.id !== order.userId) {
        throw `${id} not is from the logged user`
      }
    }

    return { ok: true, order }
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Error al obtener la orden'
    }
  }
}
