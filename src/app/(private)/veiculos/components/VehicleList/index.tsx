import styles from './styles.module.scss'

import Link from 'next/link'
import { VehicleCard } from '../VehicleCard'

import type { Vehicle } from '@/types/vehicle'

type VehicleListProps = {
  vehicles: Vehicle[]
}

export function VehicleList({ vehicles }: VehicleListProps) {


  return(
    <section className={styles.listSection}>
      <header className={styles.listHeader}>
        <h2>Veículos</h2>

        <Link
          href='/veiculos/cadastro'
          className={styles.listBtn}
        >
          Cadastrar Veículo
        </Link>
      </header>
      

      <ul className={styles.listGrid}>
        {vehicles.map(vehicle => (
          <li key={vehicle.id}>
            <VehicleCard vehicle={vehicle} />
          </li>
        ))}
      </ul>
    </section>
  )
}