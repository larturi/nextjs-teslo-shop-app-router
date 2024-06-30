import { titleFont } from '@/config/fonts'

export default function Home() {
  return (
    <main className=''>
      <h1>Hola</h1>
      <h1 className={`${titleFont.className} font-bold`}>Hola Mundo</h1>
    </main>
  )
}
