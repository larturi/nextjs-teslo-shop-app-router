import { notFound } from 'next/navigation'
import { titleFont } from '@/config/fonts'

interface Props {
  params: { id: string }
}

export default function CategoryPage({ params }: Props) {
  const { id } = params

  console.log(id)

  if (id === 'kids') {
    notFound()
  }
  return (
    <div className=''>
      <h1 className={`${titleFont.className} font-bold`}>Category Page</h1>
    </div>
  )
}
