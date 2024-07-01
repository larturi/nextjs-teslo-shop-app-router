import TopMenu from '@/components/ui/top-menu/TopMenu'

export default function ShopLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='min-h-screen'>
      <TopMenu />
      {children}
    </main>
  )
}
