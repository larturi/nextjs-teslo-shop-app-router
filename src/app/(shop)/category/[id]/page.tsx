import { notFound } from 'next/navigation'
import { titleFont } from '@/config/fonts'
import { ProductGrid, Title } from '@/components'
import { Categories } from '@/interfaces'
import { initialData } from '@/seed/seed'

interface Props {
  params: { id: Categories }
}

const seedProducts = initialData.products

export default function CategoryPage({ params }: Props) {
  const { id } = params
  const products = seedProducts.filter((product) => product.gender === id)

  const labels: Record<Categories, string> = {
    men: 'Men',
    women: 'Women',
    kid: 'Kid',
    unisex: 'All'
  }

  if (id === 'men' || id === 'women' || id === 'kid') {
    return (
      <>
        <Title
          title={`${labels[id]} Products`}
          subtitle={`All products for ${labels[id]}`}
          className='mb-2'
        />
        <ProductGrid products={products} />
      </>
    )
  }

  notFound()
}
