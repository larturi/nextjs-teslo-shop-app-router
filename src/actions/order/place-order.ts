'use server'

import { auth } from '@/auth.config'
import type { Size, Address } from '@/interfaces'
import prisma from '@/lib/prisma'

interface ProductToOrder {
  productId: string
  quantity: number
  size: Size
}

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {
  try {
    const session = await auth()
    const userId = session?.user.id

    if (!userId) {
      return {
        ok: false,
        message: 'You must be logged in to place an order'
      }
    }

    // Verificar si el usuario existe
    const userExists = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!userExists) {
      return {
        ok: false,
        message: 'Invalid user'
      }
    }

    // Obtener los productos
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds.map((p) => p.productId)
        }
      }
    })

    // Calcular los montos
    const itemsInOrder = productIds.reduce((acc, p) => acc + p.quantity, 0)

    // Calcular los totales
    const { subTotal, tax, total } = productIds.reduce(
      (totals, item) => {
        const productQuantity = item.quantity
        const product = products.find((p) => p.id === item.productId)

        if (!product) throw new Error('Invalid product')

        const subTotal = product.price * productQuantity
        totals.subTotal += subTotal
        totals.tax += subTotal * 0.15
        totals.total = totals.subTotal + totals.tax

        return totals
      },
      { subTotal: 0, tax: 0, total: 0 }
    )

    // Transaccion de base de datos
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos
      const updatedProductsPromises = products.map((product) => {
        //  Acumular los valores
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0)

        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida`)
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity
            }
          }
        })
      })

      const updatedProducts = await Promise.all(updatedProductsPromises)

      // Verificar valores negativos en las existencia = no hay stock
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene inventario suficiente`)
        }
      })

      // 2. Crear la orden
      const order = await tx.order.create({
        data: {
          userId: session?.user.id,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price: products.find((product) => product.id === p.productId)?.price ?? 0
              }))
            }
          }
        }
      })

      // 3. Crear la direccion de la orden
      const { country, userId, ...restAddress } = address

      await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id
        }
      })

      return order
    })

    return {
      ok: true,
      order: [],
      prismaTx: prismaTx
    }
  } catch (error: any) {
    console.error(error)
    return {
      ok: false,
      message: error?.message
    }
  }
}
