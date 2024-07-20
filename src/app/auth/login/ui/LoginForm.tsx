'use client'

import { useFormState } from 'react-dom'
import { authenticate } from '@/actions'
import Link from 'next/link'

export default function LoginForm() {
  const [state, dispatch] = useFormState(authenticate, undefined)

  return (
    <form action={dispatch} className='flex flex-col'>
      <label htmlFor='email'>Email</label>
      <input className='px-5 py-2 border bg-gray-200 rounded mb-5' name='email' type='email' />

      <label htmlFor='email'>Password</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        name='password'
        type='password'
      />

      <button type='submit' className='btn-primary'>
        Login
      </button>

      {/* divisor l ine */}
      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>Or</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link href='/auth/new-account' className='btn-secondary text-center'>
        Create a new account
      </Link>
    </form>
  )
}
