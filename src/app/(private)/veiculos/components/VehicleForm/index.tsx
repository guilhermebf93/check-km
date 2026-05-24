'use client'
import styles from './styles.module.scss'

import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { vehicleSchema, type VehicleFormData } from '@/schemas/vehicle'
import { createVehicle } from '@/lib/vehicles/create-vehicle'

import type { Vehicle } from '@/types/vehicle'


type VehicleFormProps = | { mode: 'create' } | { mode: 'edit', vehicle: Vehicle}

export function VehicleForm(props: VehicleFormProps) {
  const { mode } = props
  const isEdit = mode === 'edit'
  const vehicle = isEdit ? props.vehicle : null
  
  const form = useForm<VehicleFormData>({ resolver: zodResolver(vehicleSchema) })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = form

  const onSubmit: SubmitHandler<VehicleFormData> = async data => {
    const response = await createVehicle(data)
    
    if(!response.success) {
      console.log(response.error)
      return
    }

    console.log('Veículo criado')
  }

  return(
    <form
      className={styles.vehicleForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>{isEdit ? 'Editar' : 'Cadastrar'} veículo</h1>

      <label htmlFor='name'>Nome do veículo</label>
      <input
        id='name'
        type='text'
        defaultValue={isEdit ? vehicle?.name : ''}
        placeholder='Nome do veículo (Opcional)'
        {...register('name')}
      />
      {errors.name && (
        <span className={styles.errorMessage}>{errors.name.message}</span>
      )}

      <label htmlFor='brand'>Marca</label>
      <input
        id='brand'
        type='text'
        defaultValue={isEdit ? vehicle?.brand : ''}
        placeholder='Marca do veículo'
        {...register('brand')}
      />
      {errors.brand && (
        <span className={styles.errorMessage}>{errors.brand.message}</span>
      )}

      <label htmlFor='model'>Modelo</label>
      <input
        id='model'
        type='text'
        defaultValue={isEdit ? vehicle?.model : ''}
        placeholder='Modelo do veículo'
        {...register('model')}
      />
      {errors.model && (
        <span className={styles.errorMessage}>{errors.model.message}</span>
      )}

      <label htmlFor='year'>Ano</label>
      <input
        id='year'
        type='number'
        defaultValue={isEdit ? vehicle?.year : ''}
        placeholder={new Date().getFullYear().toString()}
        {...register('year')}
      />
      {errors.year && (
        <span className={styles.errorMessage}>{errors.year.message}</span>
      )}

      <label htmlFor='currentKm'>Quilometragem Atual</label>
      <input
        id='currentKm'
        type='number'
        defaultValue={isEdit ? vehicle?.currentKm : ''}
        placeholder='0'
        disabled={isEdit}
        {...register('currentKm')}
      />
      {errors.currentKm && (
        <span className={styles.errorMessage}>{errors.currentKm.message}</span>
      )}

      <label htmlFor='type'>Tipo do veículo</label>
      <select
        id='type'
        defaultValue={isEdit ? vehicle?.type : ''}
        {...register('type')}
      >
        <option value='CAR'>Carro</option>
        <option value='MOTORCYCLE'>Moto</option>
      </select>
      {errors.type && (
        <span className={styles.errorMessage}>{errors.type.message}</span>
      )}      

      <label htmlFor='photoUrl'>URL da foto</label>
      <input
        id='photoUrl'
        type='text'
        defaultValue={vehicle?.photoUrl ?? ''}
        placeholder='URL da foto do veículo'
        {...register('photoUrl')}
      />
      {errors.photoUrl && (
        <span className={styles.errorMessage}>{errors.photoUrl.message}</span>
      )}

      <button type='submit'>
        <span>{isEdit ? 'Atualizar' : 'Cadastrar'} veículo</span>
      </button>
    </form>
  )
}