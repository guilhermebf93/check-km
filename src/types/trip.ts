export type Trip = {
  id: string;
  title: string;
  startKm: number;
  endKm: number | null;
  startDate: Date;
  endDate: Date | null;
  vehicleId: string;
  notes: string | null;
  createdAt: Date;
}