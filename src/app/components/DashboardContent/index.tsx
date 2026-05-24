'use client'

import { useVehicle } from '@/contexts/VehicleContext'

export function DashboardContent() {
  const { activeVehicle } = useVehicle()

  return(
    <section>
      <h1>{activeVehicle?.brand}</h1>
    </section>
  )
}