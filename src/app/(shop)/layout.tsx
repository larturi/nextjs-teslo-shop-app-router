import Sidebar from '@/components/ui/sidebar/Sidebar'
import TopMenu from '@/components/ui/top-menu/TopMenu'

export default function ShopLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='min-h-screen'>
      <TopMenu />
      <Sidebar />
      <div className='px-0 md:px-8'>{children}</div>
    </main>
  )
}
