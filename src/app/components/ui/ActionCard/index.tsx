'use client'
import styles from './styles.module.scss'

import Link from 'next/link'

import type { LucideIcon } from 'lucide-react'

type BaseActionCardProps = {
  icon: LucideIcon,
  label: string,
}

type LinkActionCardProps = BaseActionCardProps & {
  href: string,
  onClick?: never,
}

type CallBackActionCardProps = BaseActionCardProps & {
  href?: never,
  onClick: () => void,
}

export type ActionCardProps = 
  | LinkActionCardProps
  | CallBackActionCardProps

export function ActionCard({
  icon: Icon,
  label,
  href,
  onClick,
}: ActionCardProps) {

  if (href) {
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

  return (
    <div
      onClick={onClick}
      className={styles.cardContainer}
    >
      <Icon
        className={styles.cardIcon}
        aria-hidden
      />
      <span>{label}</span>
    </div>
  )
}