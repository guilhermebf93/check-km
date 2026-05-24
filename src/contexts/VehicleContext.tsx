'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react'

import type { Vehicle } from '@/types/vehicle'

type VehicleContextData = {
  activeVehicle: Vehicle | null,
  activeVehicleId: string | null,
  setActiveVehicleId: (id: string) => void
}

type VehicleProviderProps = {
  vehicles: Vehicle[],
  children: ReactNode
}

const VehicleContext = createContext({} as VehicleContextData)

export function VehicleProvider({
  vehicles, children
}: VehicleProviderProps) {

  const [activeVehicleId, setActiveVehicleId] = useState<string | null>(null)

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!vehicles.length)
      return

    const savedVehicleId = localStorage.getItem('@checkkm:vehicle')

    const vehicleExists = vehicles.some(vehicle => vehicle.id === savedVehicleId)

    if (savedVehicleId && vehicleExists) {
      setActiveVehicleId(savedVehicleId)
      return
    }

    setActiveVehicleId(vehicles[0].id)
  },[vehicles])
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!activeVehicleId)
      return

    localStorage.setItem('@checkkm:vehicle', activeVehicleId)
  },[activeVehicleId])

  const activeVehicle = useMemo(() => {
    return vehicles.find(
      vehicle => vehicle.id === activeVehicleId
    ) || null
  },[vehicles, activeVehicleId])

  return(
    <VehicleContext.Provider
      value={{
        activeVehicle,
        activeVehicleId,
        setActiveVehicleId
      }}
    >
      {children}
    </VehicleContext.Provider>
  )
}

export function useVehicle() {
  return useContext(VehicleContext)
}