import { ProductGrid, Title } from '@/components'
import { initialData } from '@/seed/seed'
import { Product } from '../../interfaces/product.interface'

const products: Product[] = initialData.products

export default function HomePage() {
  return (
    <>
      <Title title='Tienda' subtitle='Todos los productos' className='mb-2' />

      <ProductGrid products={products} />
    </>
  )
}
