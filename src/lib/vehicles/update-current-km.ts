'use server'

import { prisma } from '@/lib/prisma'

import { updateVehicleKmSchema } from '@/schemas/update-vehicle-km'
import { getCurrentUser } from '../auth/get-user'
import { getVehicleById } from './get-vehicle-by-id'

import { revalidatePath } from 'next/cache'

export async function updateCurrentKm(id: string, newKm: number) {
  const user = await getCurrentUser()

  if (!user) {
    return {
      success: false,
      error: 'Usuário não autenticado'
    }
  }

  const parsedKm = updateVehicleKmSchema.safeParse({
    newKm
  })

  if (!parsedKm.success) {
    return {
      success: false,
      error: 'Dados inválidos'
    }
  }

  const vehicleInDb = await getVehicleById(id, user.id)

  if (!vehicleInDb) {
    return {
      success: false,
      error: 'Usuário não autorizado'
    }
  }

  if (parsedKm.data.newKm <= vehicleInDb.currentKm) {
    return {
      success: false,
      error: 'A quilometragem deve ser maior que a atual'
    }
  }

  let vehicle

  try {
    vehicle = await prisma.vehicle.update({
      where: {
        id
      },
      data: {
        currentKm: parsedKm.data.newKm
      }
    })
  } catch(error) {
    console.error(error)

    return {
      success: false,
      error: 'Erro ao atualizar veículo'
    }
  }

  revalidatePath('/');
  revalidatePath('/veiculos');
  revalidatePath(`/veiculos/${id}`);
  
  return {
    success: true,
    vehicleId: vehicle.id,
    currentKm: vehicle.currentKm,
  }
}