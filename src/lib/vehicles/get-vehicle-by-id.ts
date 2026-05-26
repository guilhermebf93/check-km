import { prisma } from '@/lib/prisma'

export async function getVehicleById(id: string, userId: string) {
  const vehicle = await prisma.vehicle.findFirst({
    where: {
      userId,
      id
    }
  })

  return vehicle
}