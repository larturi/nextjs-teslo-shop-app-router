import { ProductGrid, Title } from '@/components'
import { getPaginatedProductsWithImages } from '@/actions'

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function HomePage({ searchParams }: Props) {
  const page = searchParams.page ? Number(searchParams.page) : 1

  const { products } = await getPaginatedProductsWithImages({ page })

  return (
    <>
      <Title title='Tienda' subtitle='Todos los productos' className='mb-2' />

      <ProductGrid products={products} />
    </>
  )
}
