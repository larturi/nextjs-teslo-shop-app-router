'use server'

import prisma from '@/lib/prisma'

export const getUserAddress = async (userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: { userId }
    })

    if (!storedAddress) return null

    const { countryId, ...rest } = storedAddress

    return {
      ...rest,
      country: countryId
    }
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Failed to get user address'
    }
  }
}
