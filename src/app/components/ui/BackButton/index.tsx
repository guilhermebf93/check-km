import styles from './styles.module.scss'

import Link from 'next/link'

import { ArrowLeft } from 'lucide-react'

type BackButtonProps = {
  href?: string,
  label?: string
}

export function BackButton({ href, label }: BackButtonProps) {

  return(
    <Link
      href={href || './'}
      className={styles.backButton}
    >
      <ArrowLeft className={styles.backIcon} />
      <span>{label || 'Voltar'}</span>
    </Link>
  )
}
