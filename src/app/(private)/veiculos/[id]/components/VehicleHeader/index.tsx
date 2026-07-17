import styles from './styles.module.scss'

import Image from 'next/image'

import type { Vehicle } from '@/types/vehicle'

type VehicleHeaderProps = {
  vehicle: Vehicle
}

export function VehicleHeader({
  vehicle
}: VehicleHeaderProps) {

  const {
    name,
    brand,
    model,
    year,
    //currentKm,
    photoUrl,
    type,
    createdAt,
  } = vehicle

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