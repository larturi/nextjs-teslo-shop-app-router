export const revalidate = 60 // 60 segundos

import { notFound, redirect } from 'next/navigation'
import { Pagination, ProductGrid, Title } from '@/components'
import { getPaginatedProductsWithImages } from '@/actions'
import { Gender } from '@prisma/client'

interface Props {
  params: { gender: string }
  searchParams: {
    page?: string
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = params

  const page = searchParams.page ? Number(searchParams.page) : 1

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender: gender as Gender
  })

  if (products.length === 0) {
    redirect(`/gender/${gender}`)
  }

  const labels: Record<string, string> = {
    men: 'Men',
    women: 'Women',
    kid: 'Kid',
    unisex: 'All'
  }

  if (gender === 'men' || gender === 'women' || gender === 'kid') {
    return (
      <>
        <Title
          title={`${labels[gender]} Products`}
          subtitle={`All products for ${labels[gender]}`}
          className='mb-2'
        />
        <ProductGrid products={products} />

        <Pagination totalPages={totalPages} />
      </>
    )
  }

  notFound()
}
