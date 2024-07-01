import TopMenu from '@/components/ui/top-menu/TopMenu'

export default function ShopLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='min-h-screen'>
      <TopMenu />
      <div className='px-0 sm:px-8'>{children}</div>
    </main>
  )
}
