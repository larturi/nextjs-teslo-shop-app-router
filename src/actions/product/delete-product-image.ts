'use server'

import prisma from '@/lib/prisma'
import { ok } from 'assert'
import { v2 as cloudinary } from 'cloudinary'
import { revalidatePath } from 'next/cache'
cloudinary.config(process.env.CLOUDINARY_URL ?? '')

export default async function deleteProductImage(imageId: number, imageUrl: string) {
  if (!imageUrl.startsWith('http')) {
    return {
      ok: false,
      error: 'Error al intentar eliminar la imagen de Cloudinary'
    }
  }

  const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? ''

  try {
    await cloudinary.uploader.destroy(imageName)
    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId
      },
      select: {
        Product: {
          select: {
            slug: true
          }
        }
      }
    })

    // Revalidar paths
    revalidatePath(`/admin/products`)
    revalidatePath(`/admin/product/${deletedImage.Product?.slug}`)
    revalidatePath(`/product/${deletedImage.Product?.slug}`)
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      error: 'Error al intentar eliminar la imagen'
    }
  }
}
