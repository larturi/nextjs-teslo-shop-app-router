import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'

export default async function CheckoutLayout({ children }: { children: React.ReactNode }) {
  // Es una alternativa porque el middleware no funciona
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/login?redirectTo=/checkout/address')
  }

  return <>{children}</>
}
