import { Pagination, Title } from '@/components'

import { getPaginatedUsers } from '@/actions'
import { redirect } from 'next/navigation'
import { UsersTable } from './ui/UsersTable'

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function UsersPage({ searchParams }: Props) {
  const page = searchParams.page ? Number(searchParams.page) : 1

  const { ok, users = [], totalPages = 0 } = await getPaginatedUsers({ page, take: 10 })

  if (!ok) {
    redirect('/auth/login')
  }

  return (
    <>
      <Title title='Users Admin' />

      <div className='mb-10'>
        <UsersTable users={users} />
        <Pagination totalPages={totalPages} />
      </div>
    </>
  )
}
