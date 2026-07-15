import { z } from 'zod'

export const updateVehicleKmSchema = z.object({
  newKm: z.number().int().positive(),
})

export type UpDateVehicleKmFormData = z.input<typeof updateVehicleKmSchema>