import { prisma } from '@/lib/prisma'

export async function getUserVehicles (userId: string) {
  const userVehicles = await prisma.vehicle.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return userVehicles
}