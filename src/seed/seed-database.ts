import { url } from 'inspector'
import prisma from '../lib/prisma'
import { initialData } from './seed'

async function main() {
  const { categories, products } = initialData

  console.log('Deleting old database...')
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  console.log('Inserting Categories...')
  const categoriesData = categories.map((category) => {
    return { name: category }
  })

  await prisma.category.createMany({ data: categoriesData })

  console.log('Inserting Products...')
  const categoriesDb = await prisma.category.findMany()
  const categoriesMap = categoriesDb.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id

    return map
  }, {} as Record<string, string>)

  products.forEach(async (product) => {
    const { type, images, ...rest } = product
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        slug: product.slug.replace(/_/g, '-'),
        categoryId: categoriesMap[type]
      }
    })

    // Insert images
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id
    }))

    await prisma.productImage.createMany({
      data: imagesData
    })
  })

  console.clear()
  console.log('Seed database executed!')
}

;(() => {
  if (process.env.NODE_ENV === 'production') return
  main()
})()
