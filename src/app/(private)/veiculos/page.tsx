
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/get-user'
import { getUserVehicles } from '@/lib/vehicles/get-user-vehicles'

import { EmptyState } from '@/app/components/EmptyState'
import { BackButton } from '@/app/components/ui/BackButton'

export default async function VehiclePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const vehicles = await getUserVehicles(user.id)
  const hasVehicles = vehicles.length > 0


  return(
    <main>
      <BackButton />
      
      {!hasVehicles && <EmptyState />}
    </main>
  )
}