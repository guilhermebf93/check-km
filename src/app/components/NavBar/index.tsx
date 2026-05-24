'use client'

import styles from './styles.module.scss'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { LogoutButton } from './components/LogoutButton'
import {
  Gauge,
  House,
  CarFront,
  Fuel,
  Wrench,
  Road,
  History,
  Settings,
  type LucideIcon
} from 'lucide-react'

type NavItem = {
  icon: LucideIcon,
  label: string,
  href: string
}

export function NavBar() {
  const navItems: NavItem[] = [
    {
      icon: House,
      label: 'Dashboard',
      href: '/'
    },
    {
      icon: CarFront,
      label: 'Veículos',
      href: '/veiculos'
    },
    {
      icon: Fuel,
      label: 'Abastecimentos',
      href: '/abastecimentos'
    },
    {
      icon: Wrench,
      label: 'Manutenções',
      href: '/manutencoes'
    },
    {
      icon: Road,
      label: 'Trips',
      href: '/trips'
    },
    {
      icon: History,
      label: 'Histórico',
      href: '/historico'
    },
    {
      icon: Settings,
      label: 'Configurações',
      href: '/config'
    }
  ]

  const pathname = usePathname()

  return(
    <nav className={styles.navbar}>
      <div>
        <header className={styles.logoSection}>
          <Gauge className={styles.headerIcon}/>
          <h1>CHECK KM</h1>
        </header>

        <ul className={styles.navList}>
          {navItems.map(({ icon: Icon, label, href }: NavItem) => {
            const isActive = pathname === href
            
            return(
              (
                <li key={label} className={clsx(styles.navItem, isActive && styles.active)}>
                  <Link
                    href={href}
                    className={styles.navLink}
                  >
                    <Icon className={styles.icon} strokeWidth={1} />
                    <p className={styles.label}>{label}</p>
                  </Link>
                </li>
              )
            )
          })}
        </ul>
      </div>

      <LogoutButton />
    </nav>
  )
}