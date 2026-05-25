import styles from './styles.module.scss'

type InfoCardProps = {
  label: string,
  value: string,
  unit?: string,
  footer?: string
}

export function InfoCard({
  label, value, unit, footer
}: InfoCardProps) {


  return(
    <article className={styles.cardContainer}>
      <h3>{label}</h3>

      <span><span className={styles.cardValue}>{value}</span> {unit}</span>

      {footer && (
        <p>{footer}</p>
      )}
    </article>
  )
}