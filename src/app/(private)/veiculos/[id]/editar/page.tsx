

import { BackButton } from '@/app/components/ui/BackButton'
import { VehicleForm } from '../../components/VehicleForm'

import { redirect, notFound } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/get-user'
import { getVehicleById } from '@/lib/vehicles/get-vehicle-by-id'

type VehicleEditProps = {
  params: Promise<{
    id: string
  }>
}

export default async function VehicleEdit({ params }: VehicleEditProps) {
  const user = await getCurrentUser()

  if (!user)
    redirect('/login')

  const { id } = await params
  const vehicle = await getVehicleById(id, user.id)

  if(!vehicle)
    notFound()

  return(
    <main>
      <BackButton href={`/veiculos/${id}`} />

      <VehicleForm mode={'edit'} vehicle={vehicle} />
    </main>
  )
}