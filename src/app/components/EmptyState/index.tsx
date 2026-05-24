import styles from './styles.module.scss'

import Link from 'next/link'

export function EmptyState() {

  return(
    <section className={styles.emptyState}>
      <p className={styles.text}>Parece que você ainda não cadastrou nenhum veículo</p>

      <Link
        href='/veiculos/cadastro'
        className={styles.newVehicleButton}
      >
        Cadastrar Veículo
      </Link>
    </section>
  )
}