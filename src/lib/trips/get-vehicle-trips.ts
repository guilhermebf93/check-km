import { prisma } from '@/lib/prisma'

export async function getVehicleTrips (vehicleId: string) {
  const vehicleTrips = await prisma.trip.findMany({
    where: {
      vehicleId
    },
    orderBy: {
      startKm: 'desc'
    }
  })

  return vehicleTrips
}