import { redirect } from 'next/navigation'

import { VehicleProvider } from '@/contexts/VehicleContext'

import { DashboardHeader } from '../components/DashboardHeader'
import { DashboardContent } from '../components/DashboardContent'
import { EmptyState } from '../components/EmptyState'

import { getCurrentUser } from '@/lib/auth/get-user'
import { getUserVehicles } from '@/lib/vehicles/get-user-vehicles'

export default async function DashboardPage() {

  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const userVehicles = await getUserVehicles(user.id)
  const hasVehicles = userVehicles.length > 0

  return(
    <main>

      {!hasVehicles ? (
        <>
          <DashboardHeader
            userName={user.name!}
            vehicles={userVehicles}
          />

          <EmptyState />
        </>
      ) : (
        <VehicleProvider vehicles={userVehicles}>

          <DashboardHeader
            userName={user.name!}
            vehicles={userVehicles}
          />

          <DashboardContent />

        </VehicleProvider>
      )}

    </main>
  )
}