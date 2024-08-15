'use server'

import prisma from '@/lib/prisma'
import { Gender, Product, Size } from '@prisma/client'
import { z } from 'zod'

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender)
})

export default async function createOrUpdateProduct(formData: FormData) {
  const data = Object.fromEntries(formData)
  const productParsed = productSchema.safeParse(data)

  if (!productParsed.success) {
    console.log(productParsed.error)
    return {
      ok: false
    }
  }

  const product = productParsed.data
  const productSlug = product.slug.toLowerCase().replace(/ /g, '-').trim()

  const { id, ...rest } = product

  const prismaTransaction = await prisma.$transaction(async (tx) => {
    let product: Product
    const tagsArray = rest.tags.split(',').map((tag) => tag.trim().toLowerCase())

    if (id) {
      // Update
      product = await tx.product.update({
        where: { id },
        data: {
          ...rest,
          sizes: {
            set: rest.sizes as Size[]
          },
          tags: {
            set: tagsArray
          }
        }
      })
    } else {
      // Create
      product = await tx.product.create({
        data: {
          ...rest,
          sizes: {
            set: rest.sizes as Size[]
          },
          tags: {
            set: tagsArray
          }
        }
      })
    }

    return { product }
  })

  return {
    ok: true
  }
}
