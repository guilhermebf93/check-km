import styles from './styles.module.scss'

import Link from 'next/link'

import { Car, Motorbike } from 'lucide-react'

import type { Vehicle } from '@/types/vehicle'

type VehicleCardProps = {
  vehicle: Vehicle
}

export function VehicleCard({ vehicle }: VehicleCardProps) {


  return(
    <Link
      href={`/veiculos/${vehicle.id}`}
      className={styles.cardLink}
    >
      <article className={styles.cardStyle}>
        <header className={styles.cardHeader}>
          <h3>
            {vehicle.name || `${vehicle.brand} ${vehicle.model}`}
          </h3>

          {vehicle.name && (
            <span>
              {vehicle.brand} {vehicle.model}
            </span>
          )}
        </header>

        <div className={styles.bottomRow}>
          {
            vehicle.type === 'CAR' ? 
            <Car
              className={styles.typeIcon}
              absoluteStrokeWidth={true}
            /> : 
            <Motorbike
              className={styles.typeIcon}
              absoluteStrokeWidth={true}
            />
          }
          <div className={styles.vehicleInfo}> 
            <span className={styles.year}>
              {vehicle.year}
            </span>            

            <span className={styles.currentKm}>
              {vehicle.currentKm.toLocaleString('pt-BR')} km
            </span>
          </div>          
        </div>

      </article>
    </Link>
  )
}