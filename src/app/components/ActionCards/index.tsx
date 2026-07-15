'use client'
import styles from './styles.module.scss'

import {
  Gauge,
  Road,
  Fuel,
  Wrench
} from 'lucide-react'

import type { Vehicle } from '@/types/vehicle'
import { ActionCard, type ActionCardProps } from '../ui/ActionCard'
import { UpdateKmModal } from '../modals/UpdateKmModal'
import { useState } from 'react'

type ActionCardsProps = {
  vehicle: Vehicle
}

export function ActionCards({ vehicle }: ActionCardsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const cardsData: ActionCardProps[] = [
    {
      icon: Gauge,
      label: 'Atualizar Quilometragem',
      onClick: () => setIsModalOpen(true),
    },
    {
      icon: Road,
      label: 'Nova Trip',
      href: '/#'
    },
    {
      icon: Fuel,
      label: 'Novo Abastecimento',
      href: '/#'
    },
    {
      icon: Wrench,
      label: 'Nova Manutenção',
      href: '/#'
    }
  ]

  return(
    <section className={styles.cardsContainer}>
      <h2>Ações Rápidas</h2>

      <ul className={styles.actionCards}>
        {cardsData.map((card, index) => (
          <li key={index}>
            {'href' in card ? (
              <ActionCard
                icon={card.icon}
                label={card.label}
                href={card.href!}
              />
            ) : (
              <ActionCard
                icon={card.icon}
                label={card.label}
                onClick={card.onClick}
              />
            )}
          </li>
        ))}
      </ul>

      <UpdateKmModal 
        vehicle={vehicle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}