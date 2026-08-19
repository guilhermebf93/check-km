'use client'
import styles from './styles.module.scss'

import { useForm, useWatch, type SubmitHandler } from 'react-hook-form'
import { tripSchema, type TripFormData } from '@/schemas/trip'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { createTrip } from '@/lib/trips/create-trip'

import { VehicleSelect } from '@/app/components/VehicleSelect'
import type { Vehicle } from '@/types/vehicle'
import { useVehicle } from '@/contexts/VehicleContext'


type TripFormProps = {
  vehicles: Vehicle[]
}

export function TripForm({ vehicles }: TripFormProps) {
  const router = useRouter()
  
  const form = useForm<TripFormData>({ resolver: zodResolver(tripSchema) })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = form

  const isFinished = useWatch({
    control,
    name: 'isFinished'
  })

  const { activeVehicle } = useVehicle()

  const onSubmit: SubmitHandler<TripFormData> = async data => {
    
    // const response = await createTrip(activeVehicle!.id, data)

    // if (!response.success) {
    //   console.error(response.error)
    //   return
    // }

    // router.push(`/trips/${response.tripId}`)
    console.log(data)
  }


  return(
    <form 
      className={styles.tripForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Nova Trip</h1>

      <section className={styles.vehicleSection}>
        <h3>Veículo:</h3>

        <VehicleSelect vehicles={vehicles} />

        <div className={styles.vehicleInfo}>
          <p>
            Km atual: <span>{activeVehicle?.currentKm}</span>
          </p>
          <p>
            Atualizado por último em: <span>{activeVehicle?.updatedAt.toLocaleString('pt-BR').split(',')[0]}</span>
          </p>
        </div>
      </section>      

      <label htmlFor='title'>Nome da Trip</label>
      <input 
        type='text' 
        id='title'
        placeholder='Nome da trip'
        {...register('title')}
      />
      {errors.title && (
        <span className={styles.errorMessage}>{errors.title.message}</span>
      )}

      <label htmlFor='startKm'>Km inicial</label>
      <input
        type='number'
        id='startKm'
        defaultValue='0'
        {...register('startKm')}
      />
      {errors.startKm && (
        <span className={styles.errorMessage}>{errors.startKm.message}</span>
      )}

      <label htmlFor='isFinished' className={styles.checkoutField}>
        <input
          type='checkbox'
          id='isFinished'
          {...register('isFinished')}
        />
        <span>Encerrar viagem</span>
      </label>
      
      <label htmlFor='endKm'>Km final</label>
      <input
        type='number'
        id='endKm'
        defaultValue={activeVehicle?.currentKm}
        disabled={!isFinished}
        {...register('endKm')}
      />
      {errors.endKm && (
        <span className={styles.errorMessage}>{errors.endKm.message}</span>
      )}

      <label htmlFor='endDate'>Fim da trip</label>
      <input
        type="date"
        disabled={!isFinished}
        defaultValue={new Date().toLocaleString('pt-BR')}
        {...register("endDate")}
      />
      {errors.endDate && (
        <span className={styles.errorMessage}>{errors.endDate.message}</span>
      )}

      <label htmlFor='notes'>Observações</label>
      <textarea
        id='notes'
        rows={4}
        placeholder='(Opcional)'
        {...register('notes')}
      />
      {errors.notes && (
        <span className={styles.errorMessage}>{errors.notes.message}</span>
      )}

      <button type='submit'>Cadastrar Trip</button>
    </form>
  )
}