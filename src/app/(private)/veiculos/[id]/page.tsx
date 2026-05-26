import styles from './styles.module.scss'

import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'

import { getCurrentUser } from '@/lib/auth/get-user'
import { getVehicleById } from '@/lib/vehicles/get-vehicle-by-id'

import { VehicleHeader } from './components/VehicleHeader'
import { CurrentKmSection } from './components/currentKmSection'
import { BackButton } from '@/app/components/ui/BackButton'

type VehiclePageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const user = await getCurrentUser()

  if (!user)
    redirect('/login')

  const { id } = await params
  const vehicle = await getVehicleById(id, user.id)

  if(!vehicle)
    notFound()

  const {
    name,
    brand,
    model,
    year,
    currentKm,
    photoUrl,
    type,
    createdAt,
  } = vehicle

  return(
    <main>
      <nav className={styles.navSection}>
        <BackButton href='/veiculos' />
        <Link
          href={`/veiculos/${id}/editar`}
          className={styles.editButton}
        >
          Editar
        </Link>
      </nav>
      

      <VehicleHeader
        brand={brand}
        model={model}
        year={year}
        type={type}
        photoUrl={photoUrl}
        name={name}
        createdAt={createdAt}        
      />

      <CurrentKmSection current={currentKm} />

    </main>
  )
}