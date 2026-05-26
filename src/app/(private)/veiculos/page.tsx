import styles from './styles.module.scss'

import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/get-user'
import { getUserVehicles } from '@/lib/vehicles/get-user-vehicles'

import { EmptyState } from '@/app/components/EmptyState'
import { VehicleList } from './components/VehicleList'
import { BackButton } from '@/app/components/ui/BackButton'

import type { Vehicle } from '@/types/vehicle'

export default async function VehicleListPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const vehicles: Vehicle[] = await getUserVehicles(user.id)
  const hasVehicles = vehicles.length > 0

  return(
    <main className={styles.vehicleMain}>
      <BackButton />
      
      {
        hasVehicles ?
        <VehicleList vehicles={vehicles} /> :
        <EmptyState />
      }
    </main>
  )
}