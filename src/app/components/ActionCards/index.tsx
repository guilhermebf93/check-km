import styles from './styles.module.scss'

import {
  Gauge,
  Road,
  Fuel,
  Wrench
} from 'lucide-react'

import { ActionCard } from '../ui/ActionCard'

import type { ActionCardProps } from '../ui/ActionCard'

export function ActionCards() {

  const cardsData: ActionCardProps[] = [
    {
      icon: Gauge,
      label: 'Atualizar Quilometragem',
      href: '/#',
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
            <ActionCard
              icon={card.icon}
              label={card.label}
              href={card.href}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}