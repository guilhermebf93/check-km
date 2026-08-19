import { redirect } from 'next/navigation'

import { VehicleProvider } from '@/contexts/VehicleContext'

import { EmptyState } from '@/app/components/EmptyState'

import { getCurrentUser } from '@/lib/auth/get-user'
import { getUserVehicles } from '@/lib/vehicles/get-user-vehicles'
import { getVehicleTrips } from '@/lib/trips/get-vehicle-trips'

export default async function Trips() {

  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const userVehicles = await getUserVehicles(user.id)

  if (userVehicles.length <= 0) {
    redirect('/veiculos')
  }

  const someVehicleHasTrips = userVehicles.some(async vehicle => {
    const vehicleTrips = await getVehicleTrips(vehicle.id)

    return vehicleTrips.length > 0
  }) 

  return(
    <main>
      
      {someVehicleHasTrips ? (
        <EmptyState page='trips' />
      ) : (
        <VehicleProvider vehicles={userVehicles}>

          <h1>Trips</h1>
        </VehicleProvider>
      )}

    </main>
  )
}