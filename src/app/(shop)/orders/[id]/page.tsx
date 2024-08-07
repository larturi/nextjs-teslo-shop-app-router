import { getOrderById } from '@/actions'
import { OrderStatus, PayPalButton, Title } from '@/components'
import { currencyFormater } from '@/utils'
import { capitalizeName } from '@/utils/capitalize-string'
import Image from 'next/image'
import { redirect } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}

export default async function OrderPage({ params }: Props) {
  const { id } = params

  // Llama el server action
  const { ok, order } = await getOrderById(id)

  if (!ok) {
    redirect('/')
  }

  const address = order!.OrderAddress

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1100px]'>
        <Title title={`Order #${id.split('-')[4]}`} />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Cart */}
          <div className='flex flex-col mt-5'>
            <OrderStatus isPaid={order!.isPaid} />

            {/* Items */}
            {order!.OrderItem.map((item) => (
              <div key={item.product.slug + '-' + item.size} className='flex mb-5'>
                <Image
                  src={`/products/${item.product.productImage[0].url}`}
                  width={100}
                  height={30}
                  alt={item.product.title}
                  className='mr-5 rounded'
                  style={{
                    width: '160px',
                    height: '160px',
                    border: '1px solid #f1f1f1',
                    padding: '3px'
                  }}
                />

                <div>
                  <p className='mb-2 font-bold text-gray-700 text-sm'>{item.product.title}</p>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                  <p>Subtotal: {currencyFormater(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='bg-white rounded-xl shadow-xl p-7'>
            {/* Order Summary */}
            <h2 className='text-2xl mb-2'>Delivery address</h2>
            <div className='mb-10'>
              <p>Receiver: {capitalizeName(address?.firstName + ' ' + address?.lastName)}</p>
              <p>Address: {address?.address}</p>
              <p>City: {address?.city}</p>
              <p>CP: {address?.postalCode}</p>
              <p>Phone: {address?.phone}</p>
            </div>

            <div className='w-full h-0.5 rounded bg-gray-300 mb-10' />

            <h2 className='text-2xl mb-2'>Order Summary</h2>

            <div className='grid grid-cols-2'>
              <span>No. Products</span>
              <span className='text-right'>{order?.itemsInOrder}</span>

              <span>Subtotal</span>
              <span className='text-right'>{currencyFormater(order!.subTotal)}</span>

              <span>Taxes</span>
              <span className='text-right'>{currencyFormater(order!.tax)}</span>

              <span className='mt-5 text-2xl'>Total</span>
              <span className='mt-5 text-2xl text-right'>{currencyFormater(order!.total)}</span>
            </div>

            <div className='mt-5 mb-2 w-full'>
              {order?.isPaid ? (
                <OrderStatus isPaid={order!.isPaid} />
              ) : (
                <PayPalButton orderId={order!.id} amount={order!.total} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
