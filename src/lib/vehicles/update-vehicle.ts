'use server'

import { prisma } from '@/lib/prisma'

import { vehicleSchema } from '@/schemas/vehicle'
import { getCurrentUser } from '../auth/get-user'
import { getVehicleById } from './get-vehicle-by-id'

import { revalidatePath } from 'next/cache'

export async function updateVehicle(id: string, data: unknown) {
  const user = await getCurrentUser()

  if (!user) {
    return {
      success: false,
      error: 'Usuário não autenticado'
    }
  }

  const parsedData = vehicleSchema.safeParse(data)

  if(!parsedData.success) {
    return {
      success: false,
      error: 'Dados inválidos'
    }
  }

  const vehicleInDb = await getVehicleById(id, user.id)

  if (!vehicleInDb) {
    return {
      success: false,
      error: 'Usuário não autorizado a editar esse veículo'
    }
  }

  let vehicle;

  try {
    vehicle = await prisma.vehicle.update({
      where: {
        id
      },
      data: {
        ...parsedData.data
      }
    })
  } catch (error) {
    console.log(error)

    return {
      success: false,
      error: 'Erro ao atualizar veículo'
    }
  }

  revalidatePath('/veiculos')
  revalidatePath(`/veiculos/${id}`)

  return {
    success: true,
    vehicleId: vehicle.id
  }
}