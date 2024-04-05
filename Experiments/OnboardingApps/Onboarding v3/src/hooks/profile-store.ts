import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useProfileStore = create(
  persist(
    () => ({
      firstName: '',
      lastName: '',
      dob: '',
      address: '',
    }),
    { name: 'profile-store' },
  ),
)
