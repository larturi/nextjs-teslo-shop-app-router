// https://tailwindcomponents.com/component/hoverable-table

import { Pagination, Title } from '@/components'

import Link from 'next/link'
import { IoCardOutline } from 'react-icons/io5'
import { getPaginatedOrders } from '@/actions'
import { redirect } from 'next/navigation'
import { capitalizeName } from '@/utils/capitalize-string'
import clsx from 'clsx'

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function OrdersPage({ searchParams }: Props) {
  const page = searchParams.page ? Number(searchParams.page) : 1

  const { ok, orders = [], totalPages = 0 } = await getPaginatedOrders({ page, take: 10 })

  if (!ok) {
    redirect('/auth/login')
  }

  return (
    <>
      <Title title='Orders' />

      <div className='mb-10'>
        <table className='min-w-full'>
          <thead className='bg-gray-200 border-b'>
            <tr>
              <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                #ID
              </th>
              <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                Nombre completo
              </th>
              <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                Estado
              </th>
              <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'
              >
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  {order.id}
                </td>
                <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                  {capitalizeName(
                    order.OrderAddress?.firstName + ' ' + order.OrderAddress?.lastName
                  )}
                </td>
                <td className='flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                  <IoCardOutline
                    className={clsx({
                      'text-red-500': !order.isPaid,
                      'text-green-700': order.isPaid
                    })}
                  />{' '}
                  <span
                    className={clsx('mx-2', {
                      'text-red-500': !order!.isPaid,
                      'text-green-700': order!.isPaid
                    })}
                  >
                    {order!.isPaid
                      ? `Paid on ${new Date(order!.paidAt!).toLocaleDateString()}`
                      : 'Order Pending Payment'}
                  </span>
                </td>
                <td className='text-sm text-gray-900 font-light px-6 '>
                  <Link href={`/orders/${order.id}`} className='hover:underline'>
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination totalPages={totalPages} />
      </div>
    </>
  )
}
