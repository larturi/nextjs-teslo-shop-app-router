import { QuantitySelector, Title } from '@/components'
import { initialData } from '@/seed/seed'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const productsInCart = [initialData.products[0], initialData.products[1], initialData.products[2]]

export default function CartPage() {
  if (productsInCart.length === 0) {
    redirect('/empty')
  }
  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1100px]'>
        <Title title='Cart' />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Cart */}
          <div className='flex flex-col mt-5'>
            <span className='text-xl'>Add more items</span>
            <Link href='/' className='underline mb-5 mt-1'>
              Continue shopping
            </Link>

            {/* Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className='flex mb-5'>
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={30}
                  alt={product.title}
                  className='mr-5 rounded'
                  style={{
                    width: '160px',
                    height: '160px',
                    border: '1px solid #f1f1f1',
                    padding: '3px'
                  }}
                />

                <div>
                  <p className='mb-2 font-bold text-gray-700 text-sm'>{product.title}</p>
                  <p>${product.price}</p>
                  <QuantitySelector quantity={3} />

                  <button className='underline mt-3'>Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
            <h2 className='text-2xl mb-2'>Order Summary</h2>

            <div className='grid grid-cols-2'>
              <span>No. Products</span>
              <span className='text-right'>3 articles</span>

              <span>Subtotal</span>
              <span className='text-right'>$100</span>

              <span>Taxes</span>
              <span className='text-right'>$15</span>

              <span className='mt-5 text-2xl'>Total</span>
              <span className='mt-5 text-2xl text-right'>$115</span>
            </div>

            <div className='mt-5 mb-2 w-full'>
              <Link href='/checkout/address' className='flex justify-center btn-primary'>
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
