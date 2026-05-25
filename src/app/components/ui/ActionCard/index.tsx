import styles from './styles.module.scss'

import Link from 'next/link'

import type { LucideIcon } from 'lucide-react'

export type ActionCardProps = {
  icon: LucideIcon,
  label: string,
  href: string
}

export function ActionCard({
  icon: Icon,
  label,
  href
}: ActionCardProps) {

  return(
    <Link
      href={href}
      className={styles.cardContainer}
    >
      <Icon
        className={styles.cardIcon}
        aria-hidden
      />
      <span>{label}</span>
    </Link>
  )
}