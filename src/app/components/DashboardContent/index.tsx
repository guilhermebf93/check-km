'use client'
import styles from './styles.module.scss'

import { useVehicle } from '@/contexts/VehicleContext'

import { InfoCard } from '../ui/InfoCard'
import { ActionCards } from '../ActionCards'

export function DashboardContent() {
  const { activeVehicle } = useVehicle()

  if (!activeVehicle)
    return null


  const infoCardsData = [
    {
      label: 'Quilometragem Atual',
      value: activeVehicle?.currentKm.toLocaleString('pt-BR'),
      unit: 'km',
      footer: `Atualizado há ${
        Math.floor((new Date().getTime() - activeVehicle?.updatedAt.getTime()) / (1000 * 60 * 60 * 24))
      } dias`
    },
    {
      label: 'Consumo médio',
      value: '12,4',
      unit: 'km/l',
      footer: 'Últimos 3 abastecimentos'
    },
    {
      label: 'Gasto Total (mês)',
      value: 'R$ 680,50',
      footer: '+8% em relação ao mês anterior'
    }
  ]

  return(
    <section
      className={styles.dashBoardContent}
    >
      
      <ul className={styles.infoCards}>
        {infoCardsData.map((card, index)=> (
          <li
            key={index}
            className='info-card'
          >
            <InfoCard
              label={card.label}
              value={card.value}
              unit={card.unit}
              footer={card.footer}
            />
          </li>
        ))}
      </ul>

      <ActionCards vehicle={activeVehicle} />

    </section>
  )
}