import { auth } from '@/auth.config'
import { Title } from '@/components'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const sesion = await auth()

  //   if (!sesion?.user) redirect('/auth/login?returnTo=/profile')
  if (!sesion?.user) redirect('/')

  return (
    <div className='mb-10'>
      <Title title='Profile' />

      <pre>{JSON.stringify(sesion.user, null, 2)}</pre>
    </div>
  )
}
