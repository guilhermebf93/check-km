import { z } from "zod";

export const tripSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Informe um título para a viagem.")
      .max(100, "O título deve ter no máximo 100 caracteres."),

    startKm: z.coerce
      .number()
      .int("A quilometragem deve ser um número inteiro.")
      .min(0, "A quilometragem não pode ser negativa."),

    endKm: z.coerce
      .number()
      .int("A quilometragem deve ser um número inteiro.")
      .min(0, "A quilometragem não pode ser negativa.")
      .optional(),

    startDate: z.iso.date(),

    endDate: z.iso.date().optional(),

    isFinished: z.boolean(),

    notes: z
      .string()
      .trim()
      .max(1000, "As observações podem ter no máximo 1000 caracteres.")
      .optional(),
  })
  .superRefine((trip, ctx) => {
    if (trip.endKm && trip.endKm <= trip.startKm) {
      ctx.addIssue({
        code: 'custom',
        path: ["endKm"],
        message: "A quilometragem final deve ser maior que a inicial.",
      });
    }

    if (trip.endDate && trip.endDate < trip.startDate) {
      ctx.addIssue({
        code: 'custom',
        path: ["endDate"],
        message: "A data final não pode ser anterior à data inicial.",
      });
    }
  });

export type TripFormData = z.input<typeof tripSchema>;