

import { BackButton } from '@/app/components/ui/BackButton'
import { VehicleForm } from '../components/VehicleForm'

import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/get-user'

export default async function newVehicle() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login')
  }

  return(
    <main>
      <BackButton href='/veiculos' />

      <VehicleForm mode='create' />
    </main>
  )
}