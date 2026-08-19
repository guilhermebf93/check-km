'use server'

import { prisma } from '@/lib/prisma'
import { tripSchema } from '@/schemas/trip'
import { getCurrentUser } from '../auth/get-user'
import { getVehicleById } from '../vehicles/get-vehicle-by-id'

import { revalidatePath } from 'next/cache'

export async function createTrip(
  vehicleId: string,
  data: unknown
) {
  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      error: 'Usuário não autenticado'
    }
  }

  const parsedData = tripSchema.safeParse(data)

  if (!parsedData.success) {
    return {
      success: false,
      error: 'Dados inválidos'
    }
  }

  const vehicle = await getVehicleById(vehicleId, user.id)
  const trip = parsedData.data

  if (!vehicle) {
    return {
      success: false,
      error: 'Usuário não autorizado a criar uma trip para esse veículo'
    }
  }

  if (trip.endKm && trip.endKm > vehicle.currentKm) {
  return {
    success: false,
    error: 'A quilometragem final não pode ser maior que a quilometragem atual do veículo.'
  }
}

  try {
    const newTrip = await prisma.trip.create({
      data: {
        vehicleId,
        endKm: trip.isFinished ? trip.endKm : null,
        endDate: trip.isFinished ? trip.endDate : null,
        title: trip.title,
        startKm: trip.startKm,
        startDate: trip.startDate,
        notes: trip.notes
      }
    })

    revalidatePath('/')
    revalidatePath('/veiculos')
    revalidatePath(`/veiculos/${vehicleId}`)
    revalidatePath('/trips')

    return {
      success: true,
      tripId: newTrip.id
    }
  } catch(error) {
    console.error(error)

    return {
      success: false,
      error: 'Erro ao criar trip'
    }
  }
}