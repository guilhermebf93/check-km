'use client'
import type { Vehicle } from '@/types/vehicle'

type VehicleSelectProps = {
  vehicles: Vehicle[]
}

export function VehicleSelect({ vehicles }: VehicleSelectProps) {

  return(
    <select>
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