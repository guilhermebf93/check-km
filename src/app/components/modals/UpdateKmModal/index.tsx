'use client'
import styles from './styles.module.scss'

import { useEffect } from 'react'
import { useForm, useWatch, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateVehicleKmSchema, type UpDateVehicleKmFormData } from '@/schemas/update-vehicle-km'
import { updateCurrentKm } from '@/lib/vehicles/update-current-km'

import { type Vehicle } from '@/types/vehicle'

type UpdateKmModalProps = {
  vehicle: Vehicle,
  isOpen: boolean,
  onClose: () => void,
}

export function UpdateKmModal({
  vehicle,
  isOpen,
  onClose
}: UpdateKmModalProps) {

  const form = useForm<UpDateVehicleKmFormData>({
    resolver: zodResolver(updateVehicleKmSchema),
    mode: 'onChange'
  })

  const {
    register,
    handleSubmit,
    setFocus,
    formState: {
      isValid,
      isSubmitting
    }
  } = form

  const newKm = useWatch({
    control: form.control,
    name: 'newKm'
  })

  const difference = newKm && newKm >= vehicle.currentKm
    ? newKm - vehicle.currentKm
    : 0
  
  const isButtonValid = isValid && difference > 0

  const onSubmit: SubmitHandler<UpDateVehicleKmFormData> = async data => {
    const response = await updateCurrentKm(vehicle.id, data.newKm)

    if (!response.success) {
      console.log(response.error)
      return
    }

    onClose()
  }

  useEffect(() => {
    if (isOpen) {
      setFocus('newKm')
    }
  }, [isOpen, setFocus])

  useEffect(() => {
    function handleKeyDown (e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])



  return(
    <>
      {isOpen && (
        <div className={styles.overlay} onClick={onClose}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h1>Atualizar KM</h1>

            <div className={styles.currentVehicle}>
              {vehicle.name ? (
                <h2>{vehicle.name}</h2>
              ) : (
                <h2>{vehicle.brand} {vehicle.model}</h2>
              )}
              
              <p>Atual: <span className={styles.currentNumber}>{vehicle.currentKm} km</span></p>
            </div>

            <form 
              className={styles.form}
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                id='newKm' 
                type='number'
                disabled={isSubmitting}
                className={styles.newKmInput}
                {...register('newKm', {
                  valueAsNumber: true,
                })}
              />
              {difference > 0 ? (
                <p className={styles.valid}>+ {difference} km</p>
              ) : (
                <p className={styles.notValid}>A nova quilometragem deve ser superior à atual</p>
              )}

              <div className={styles.buttons}>
                <button type='button' onClick={onClose}>Cancelar</button>
                <button
                  type='submit' 
                  disabled={!isButtonValid || isSubmitting}
                >
                  {isSubmitting ? 'Atualizando...' : 'Atualizar'}
                </button>
              </div>
              
            </form>
            
          </div>      
        </div>
      )}
    </>
  )
}