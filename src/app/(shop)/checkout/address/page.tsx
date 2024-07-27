import { Title } from '@/components'
import AddressForm from './ui/AddressForm'
import { getCountries, getUserAddress } from '@/actions'
import { auth } from '@/auth.config'

export default async function AddressPage() {
  const session = await auth()

  if (!session?.user) {
    return (
      <div className='flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0'>
        <div className='w-full  xl:w-[1000px] flex flex-col justify-center text-left'>
          <Title title='Dirección' subtitle='Dirección de entrega' />
          <p className='text-red-500 text-sm'>Debe estar autenticado para ver esta página</p>
        </div>
      </div>
    )
  }

  const countries = await getCountries()
  const storedAddress = (await getUserAddress(session.user.id)) || {}

  return (
    <div className='flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0'>
      <div className='w-full  xl:w-[1000px] flex flex-col justify-center text-left'>
        <Title title='Dirección' subtitle='Dirección de entrega' />

        <AddressForm countries={countries} userStoredAddress={storedAddress} />
      </div>
    </div>
  )
}
