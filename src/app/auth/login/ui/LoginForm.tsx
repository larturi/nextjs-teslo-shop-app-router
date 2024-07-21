'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { useEffect } from 'react'
import Link from 'next/link'
import { IoInformationCircleOutline } from 'react-icons/io5'
import clsx from 'clsx'
import { authenticate } from '@/actions'
import { useSearchParams } from 'next/navigation'

export default function LoginForm() {
  const [state, dispatch] = useFormState(authenticate, undefined)

  // Get ?redirectTo from URL
  const searchParams = useSearchParams()
  const redirectTo = searchParams?.get('redirectTo') ?? undefined

  useEffect(() => {
    if (state === 'Success') {
      window.location.replace(redirectTo ?? '/')
    }
  }, [redirectTo, state])

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

      <LoginButton />

      {/* divisor l ine */}
      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>Or</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link href='/auth/new-account' className='btn-secondary text-center'>
        Create a new account
      </Link>

      <div className='flex h-8 items-end space-x-1' aria-live='polite' aria-atomic='true'>
        {state === 'CredentialsSignin' && (
          <>
            <IoInformationCircleOutline className='h-5 w-5 text-red-500' />
            <p className='text-sm text-red-500'>Invalid Credentials</p>
          </>
        )}
      </div>
    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      className={clsx({
        'btn-primary': !pending,
        'btn-disabled': pending
      })}
      disabled={pending}
    >
      Login
    </button>
  )
}
