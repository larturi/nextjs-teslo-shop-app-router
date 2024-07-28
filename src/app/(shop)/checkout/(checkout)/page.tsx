import { Title } from '@/components'
import Link from 'next/link'
import ProductsInCart from './ui/ProductsInCart'
import PlaceOrder from './ui/PlaceOrder'

export default function CheckoutPage() {
  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1100px]'>
        <Title title='Confirm Order' />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Cart */}
          <div className='flex flex-col mt-5'>
            <span className='text-xl'>Change or edit</span>
            <Link href='/cart' className='underline mb-5 mt-1'>
              Edit cart
            </Link>

            {/* Items */}
            <ProductsInCart />
          </div>

          {/* Order Summary */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  )
}
