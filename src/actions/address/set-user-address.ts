'use server'

import { Address } from '@/interfaces'
import prisma from '@/lib/prisma'

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId)
    return {
      ok: true,
      address: newAddress
    }
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Failed to set user address'
    }
  }
}

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: { userId }
    })

    const addressToSave = {
      userId: userId,
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode
    }

    if (!storedAddress) {
      await prisma.userAddress.create({
        data: addressToSave
      })
    }

    const updatedAddress = await prisma.userAddress.update({
      where: { userId },
      data: addressToSave
    })

    return updatedAddress
  } catch (error) {
    console.error(error)
    throw new Error('Failed to create or replace address')
  }
}
