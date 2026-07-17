'use client'
import styles from './styles.module.scss'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteVehicle } from '@/lib/vehicles/delete-vehicle'

import { ConfirmModal } from '@/app/components/modals/ConfirmModal'

import type { Vehicle } from '@/types/vehicle'

type DeleteVehicleProps = {
  vehicle: Vehicle
}

export function DeleteVehicle({ vehicle }:DeleteVehicleProps) {
  const [ isModalOpen, setIsModalOpen ] = useState(false)

  const router = useRouter()

  async function handleDelete() {
    const result = await deleteVehicle(vehicle.id)

    if (!result.success) {
      return
    }

    router.push('/veiculos')
  }

  return(
    <>
      <button 
        type='button'
        onClick={() => setIsModalOpen(true)}
        className={styles.deleteButton}
      >
        Excluir
      </button>

      <ConfirmModal 
        title={`Deseja excluir ${vehicle.name ? vehicle.name : `${vehicle.brand} ${vehicle.model}`}?`}
        description='Essa ação não poderá ser desfeita!'
        confirmText='Excluir'
        intent='danger'
        isOpen={isModalOpen}
        onConfirm={handleDelete}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}