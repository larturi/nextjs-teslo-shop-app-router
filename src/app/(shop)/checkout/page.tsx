import { QuantitySelector, Title } from '@/components'
import { initialData } from '@/seed/seed'
import Image from 'next/image'
import Link from 'next/link'

const productsInCart = [initialData.products[0], initialData.products[1], initialData.products[2]]

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
                  <p>${product.price} x 3</p>
                  <p>Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='bg-white rounded-xl shadow-xl p-7'>
            {/* Order Summary */}
            <h2 className='text-2xl mb-2'>Delivery address</h2>
            <div className='mb-10'>
              <p>Receiver: Leandro Arturi</p>
              <p>Address: Av. Corrientes 123</p>
              <p>City: Ciudad de Buenos Aires</p>
              <p>CP: 1233</p>
              <p>Phone: 12-3333-3344</p>
            </div>

            <div className='w-full h-0.5 rounded bg-gray-300 mb-10' />

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
              <p className='mb-5'>
                <span className='text-xs'>
                  By clicking you confirm our{' '}
                  <a className='underline' href='#' target='_blank' rel='noopener noreferrer'>
                    terms and conditions
                  </a>
                  <span> and </span>
                  <a className='underline' href='#' target='_blank' rel='noopener noreferrer'>
                    privacy policy
                  </a>
                  <span>.</span>
                </span>
              </p>
              <Link href='/orders/123' className='flex justify-center btn-primary'>
                Confirm Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
