'use server'

import { prisma } from '@/lib/prisma'
import { vehicleSchema } from '@/schemas/vehicle'
import { getCurrentUser } from '../auth/get-user'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createVehicle (data: unknown) {
  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      error: 'Usuário não autenticado'
    }
  }

  const parsedData = vehicleSchema.safeParse(data)

  if (!parsedData.success) {
    return {
      success: true,
      error: 'Dados inválidos'
    }
  }

  let vehicle
  
  try {
    vehicle = await prisma.vehicle.create({
      data: {
        userId: user.id,
        ...parsedData.data
      }
    })
  } catch(error) {
    console.error(error)

    return {
      success: false,
      error: 'Erro ao cadastrar veículo'
    }
  }

  revalidatePath('/veiculos')
  redirect(`/veiculos/${vehicle.id}`)
}