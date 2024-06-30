export default function ShopLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className='min-h-screen bg-gray-200'>{children}</main>
}
