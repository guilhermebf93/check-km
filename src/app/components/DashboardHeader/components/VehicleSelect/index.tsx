'use client'
import styles from './styles.module.scss'

import { useVehicle } from '@/contexts/VehicleContext'

import type { Vehicle } from '@/types/vehicle'

type VehicleSelectProps = {
  vehicles: Vehicle[]
}

export function VehicleSelect({ vehicles }: VehicleSelectProps) {

  const {
    activeVehicleId,
    setActiveVehicleId
  } = useVehicle()

  return(
    <select
      value={activeVehicleId || ''}
      onChange={(e) => setActiveVehicleId(e.target.value)}
      className={styles.vehicleSelect}
    >
      <option value='' disabled>Selecione um veículo</option>
      {vehicles.map(vehicle => (
        <option
          key={vehicle.id}
          value={vehicle.id}
        >
          {vehicle.name || `${vehicle.brand} ${vehicle.model}`}
        </option>
      ))}
    </select>
  )
}