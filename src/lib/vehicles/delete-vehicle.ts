'use server'

import { prisma } from '@/lib/prisma'

import { getCurrentUser } from '../auth/get-user'
import { getVehicleById } from './get-vehicle-by-id'

import { revalidatePath } from 'next/cache'

export async function deleteVehicle(id: string) {
  const user = await getCurrentUser()

  if (!user) {
    return {
      success: false,
      error: 'Usuário não autenticado'
    }
  }

  const existingVehicle = await getVehicleById(id, user.id)

  if (!existingVehicle) {
    return {
      success: false,
      error: 'Usuário não autorizado a deletar esse veículo'
    }
  }

  try {
    const vehicle = await prisma.vehicle.delete({
      where: {
        id
      }
    })

    revalidatePath('/')
    revalidatePath('/veiculos')

    return {
      success: true,
      vehicleId: vehicle.id
    }
  } catch (error) {
    console.log(error)

    return {
      success: false,
      error: 'Erro ao deletar veículo'
    }
  }  
}