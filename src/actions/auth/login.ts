'use server'

import { signIn } from '@/auth.config'

export async function authenticate(prevState: string | undefined, formData: FormData) {
  // console.log(Object.fromEntries(formData))

  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false
    })

    return 'Success'
  } catch (error) {
    if ((error as any).type === 'CredentialsSignin') {
      return 'CredentialsSignin'
    }
    console.log(error)

    return 'UnknownErrorOnLogin'
  }
}
