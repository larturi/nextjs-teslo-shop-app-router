'use client'

import generatePaginationNumbers from '@/utils/generate-pagination-number'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'

interface Props {
  totalPages: number
}

export default function Pagination({ totalPages }: Props) {
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const pageString = searchParams.get('page') ?? 1
  let currentPage = isNaN(Number(pageString)) ? 1 : Number(pageString)

  if (currentPage < 1) {
    currentPage = 1
  }

  const allPages = generatePaginationNumbers(currentPage, totalPages)

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    if (pageNumber === '...') {
      return `${pathName}?${params.toString()}`
    }

    if (+pageNumber === 0) {
      return `${pathName}`
    }

    if (+pageNumber > totalPages) {
      return `${pathName}?${params.toString()}`
    }

    params.set('page', pageNumber.toString())

    return `${pathName}?${params.toString()}`
  }

  return (
    <div className='flex justify-center text-center mb-32 mt-10'>
      <nav aria-label='Page navigation example'>
        <ul className='flex list-style-none'>
          <li className='page-item'>
            <Link
              className='page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline size={25} />
            </Link>
          </li>

          {allPages.map((page, index) => (
            <li key={page + '-' + index} className='page-item'>
              <Link
                className={clsx(
                  'page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded',
                  {
                    'bg-blue-700 shadow-md text-white hover:bg-blue-600': page === currentPage
                  }
                )}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}

          <li className='page-item'>
            <Link
              className='page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={25} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
