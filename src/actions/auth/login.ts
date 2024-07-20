'use server'

import { signIn } from '@/auth.config'

export async function authenticate(prevState: string | undefined, formData: FormData) {
  console.log(111)
  console.log(Object.fromEntries(formData))
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false
    })

    return 'Success'
  } catch (error) {
    console.log(error)

    return 'CredentialsSignin'
  }
}
