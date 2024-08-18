import { auth } from '@/auth.config'
import { Title } from '@/components'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const session = await auth()

  //   if (!sesion?.user) redirect('/auth/login?returnTo=/profile')
  if (!session?.user) redirect('/')

  return (
    <div className='mb-10 p-4'>
      <Title title='Profile' />

      <div className='flex flex-col gap-5 p-4 bg-gray-100 rounded-lg'>
        <p className='text-gray-800 font-semibold'>Name: {session.user.name}</p>
        <p className='text-gray-800 font-semibold'>Email: {session.user.email}</p>
        <p className='text-gray-800 font-semibold'>
          Email Verified: {session.user.emailVerified ? 'Si' : 'No'}
        </p>
        <p className='text-gray-800 font-semibold'>Role: {session.user.role.toUpperCase()}</p>
      </div>
    </div>
  )
}
