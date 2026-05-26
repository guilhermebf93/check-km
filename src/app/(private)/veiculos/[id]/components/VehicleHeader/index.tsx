import styles from './styles.module.scss'

import Image from 'next/image'

type VehicleHeaderProps = {
  brand: string,
  model: string,
  year: number,
  type: 'CAR' | 'MOTORCYCLE',
  createdAt: Date,
  photoUrl?: string | null,
  name?: string | null,
}

export function VehicleHeader({
  brand, model, year, type, createdAt, photoUrl, name
}: VehicleHeaderProps) {


  return(
    <article className={styles.headerMain}>
      <section className={styles.imgSection}>
        <Image
          src={photoUrl || '/images/no-photo.png'}
          alt='Foto do veículo'
          fill
        />
      </section>

      <section className={styles.infoSection}>  
        <h2>
          {name || `${brand} ${model}`}
        </h2>

        <span className={styles.subtitle}>
          {name && `${brand}  ·  ${model}  ·  `}{year}
        </span>

        <span className={styles.typeCard}>
          {type === 'CAR' ? 'Carro' : 'Moto'}
        </span>

        <span className={styles.createdInfo}>
          Cadastrado em {createdAt.toLocaleString('pt-BR').split(',')[0]}
        </span>
      </section>
    </article>
  )
}