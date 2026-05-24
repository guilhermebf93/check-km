import { redirect } from 'next/navigation'

import { DashboardHeader } from '../components/DashboardHeader'

import { getCurrentUser } from '@/lib/auth/get-user'
import { getUserVehicles } from '@/lib/vehicles/get-user-vehicles'

export default async function DashboardPage() {

  const userDb = await getCurrentUser()

  if (!userDb) {
    redirect('/login')
  }

  const userVehicles = await getUserVehicles(userDb.id)

  return(
    <main>
      <DashboardHeader userName={userDb.name!} vehicles={userVehicles} />
    </main>
  )
}