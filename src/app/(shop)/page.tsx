export const revalidate = 60 // 60 segundos

import { ProductGrid, Title, Pagination } from '@/components'
import { getPaginatedProductsWithImages } from '@/actions'
import { redirect } from 'next/navigation'

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function HomePage({ searchParams }: Props) {
  const page = searchParams.page ? Number(searchParams.page) : 1

  const { products, totalPages } = await getPaginatedProductsWithImages({ page })

  if (products.length === 0) {
    redirect('/')
  }

  return (
    <>
      <Title title='Tienda' subtitle='Todos los productos' className='mb-2 px-4' />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  )
}
