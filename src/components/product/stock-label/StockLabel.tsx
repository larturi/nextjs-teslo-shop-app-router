/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { getStockBySlug } from '@/actions'
import { titleFont } from '@/config/fonts'
import { useEffect, useState } from 'react'

interface Props {
  slug: string
}

export default function StockLabel({ slug }: Props) {
  const [stock, setStock] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getStock()
  }, [])

  const getStock = async () => {
    const inStock = await getStockBySlug(slug)
    setStock(inStock)
    setIsLoading(false)
  }

  return (
    <>
      {isLoading ? (
        <h1
          className={`${titleFont.className} antialiased font-bold text-xl mb-3 text-gray-600 animate-pulse bg-gray-200 max-w-[100px] rounded-md`}
        >
          &nbsp;
        </h1>
      ) : (
        <h1 className={`${titleFont.className} antialiased font-bold text-xl mb-1 text-gray-600`}>
          Stock: {isLoading ? '...' : stock}
        </h1>
      )}
    </>
  )
}
