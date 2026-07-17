import styles from './styles.module.scss'

import Link from 'next/link'

type EmptyStateProps = {
  page: 'vehicles' | 'trips' | 'maintenance' | 'fuel'
}

export function EmptyState({ page }: EmptyStateProps) {

  const emptyStateData = {
    vehicles: {
      text: 'veículo',
      link: 'veiculos'
    },
    trips: {
      text: 'trip',
      link: 'trips'
    },
    maintenance: {
      text: 'manutenção',
      link: 'manutencoes'
    },
    fuel: {
      text: 'abastecimento',
      link: 'abastecimentos'
    }
  }

  return(
    <section className={styles.emptyState}>
      <p className={styles.text}>Parece que você ainda não cadastrou {
          page === 'trips' || page === 'maintenance' ?
            'nenhuma' : 'nenhum'
        } {emptyStateData[page].text}</p>

      <Link
        href={`/${emptyStateData[page].link}/cadastro`}
        className={styles.newButton}
      >
        Cadastrar {emptyStateData[page].text}
      </Link>
    </section>
  )
}