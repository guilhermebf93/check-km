import { z } from 'zod'

export const vehicleSchema = z.object({
  name: z.string().trim().optional(),
  brand: z.string().trim().min(2, 'Marca muito curta'),
  model: z.string().trim().min(1, 'Modelo obrigatório'),
  year: z.coerce.number().min(1900, 'Ano inválido').max(new Date().getFullYear() + 2, 'Ano inválido'),
  currentKm: z.coerce.number().min(0, 'Km inválido'),
  type: z.enum([
    'CAR', 'MOTORCYCLE'
  ]),
  photoUrl: z.url('URL Inválida')
    .optional()
    .or(z.literal(''))
})

export type VehicleFormData = z.input<typeof vehicleSchema>