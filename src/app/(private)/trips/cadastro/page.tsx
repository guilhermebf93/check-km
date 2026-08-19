import { BackButton } from '@/app/components/ui/BackButton'
import { TripForm } from '../components/TripForm'
import { VehicleProvider } from '@/contexts/VehicleContext'

import { getCurrentUser } from '@/lib/auth/get-user'
import { getUserVehicles } from '@/lib/vehicles/get-user-vehicles'
import { redirect } from 'next/navigation'

export default async function newTrip() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const userVehicles = await getUserVehicles(user.id)

  if (userVehicles.length == 0) {
    redirect('/veiculos')
  }

  return(
    <main>
      <BackButton href='/trips' />

      <VehicleProvider vehicles={userVehicles}>
        <TripForm vehicles={userVehicles} />
      </VehicleProvider>
    </main>
  )
}