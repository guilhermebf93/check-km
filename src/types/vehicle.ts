export type Vehicle = {
  model: string;
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  brand: string;
  year: number;
  currentKm: number;
  type: 'CAR' | 'MOTORCYCLE';
  photoUrl: string | null;
}