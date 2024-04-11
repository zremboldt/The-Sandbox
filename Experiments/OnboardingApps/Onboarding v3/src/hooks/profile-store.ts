import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  firstName: string
  lastName: string
  dob: Date | null
  address: string
}

type Action = {
  updateFirstName: (firstName: State['firstName']) => void
  updateLastName: (lastName: State['lastName']) => void
  updateDob: (dob: State['dob']) => void
  updateAddress: (address: State['address']) => void
}

export const useProfileStore = create(
  persist<State & Action>(
    (set) => ({
      firstName: '',
      lastName: '',
      dob: null,
      address: '',
      updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
      updateLastName: (lastName) => set(() => ({ lastName: lastName })),
      updateDob: (dob) => set(() => ({ dob: dob })),
      updateAddress: (address) => set(() => ({ address: address })),
    }),
    { name: 'profile-store' },
  ),
)
