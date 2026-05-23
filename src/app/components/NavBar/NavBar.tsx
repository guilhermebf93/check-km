import styles from './navbar.module.scss'

import { Gauge } from 'lucide-react'

export function NavBar() {


  return(
    <nav className={styles.navbar}>
      <header>
        <Gauge />
        <h1>CHECK KM</h1>
      </header>
    </nav>
  )
}