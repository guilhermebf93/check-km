import styles from './styles.module.scss'

import type { Vehicle } from '@/types/vehicle'

import { VehicleSelect } from './components/VehicleSelect'

type DashboardHeaderProps = {
  userName: string,
  vehicles: Vehicle[]
}

export function DashboardHeader({userName, vehicles}:DashboardHeaderProps) {
  return(
    <header className={styles.dashboardHeader}>
      <h1>Olá, {userName.split(' ')[0]}!</h1>

      <VehicleSelect vehicles={vehicles} />
    </header>
  )
}