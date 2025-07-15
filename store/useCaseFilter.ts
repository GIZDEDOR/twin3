import { create } from 'zustand'

interface CaseFilterState {
  category: string | null
  subfilter: string | null
  setCategory: (category: string | null) => void
  setSubfilter: (subfilter: string | null) => void
}

export const useCaseFilter = create<CaseFilterState>((set) => ({
  category: null,
  subfilter: null,
  setCategory: (category) => set({ category, subfilter: null }),
  setSubfilter: (subfilter) => set({ subfilter }),
}))