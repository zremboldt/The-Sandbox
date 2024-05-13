import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  firstName: string
  lastName: string
  dob: Date | null
  address: string
  homeowner: boolean | null
}

type Action = {
  updateFirstName: (firstName: State['firstName']) => void
  updateLastName: (lastName: State['lastName']) => void
  updateDob: (dob: State['dob']) => void
  updateAddress: (address: State['address']) => void
  updateHomeowner: (homeowner: State['homeowner']) => void
}

export const useProfileStore = create(
  persist<State & Action>(
    (set) => ({
      firstName: '',
      lastName: '',
      dob: null,
      address: '',
      homeowner: null,
      updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
      updateLastName: (lastName) => set(() => ({ lastName: lastName })),
      updateDob: (dob) => set(() => ({ dob: dob })),
      updateAddress: (address) => set(() => ({ address: address })),
      updateHomeowner: (homeowner) => set(() => ({ homeowner: homeowner })),
    }),
    { name: 'profile-store' },
  ),
)
