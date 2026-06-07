import { create } from "zustand";

type ProductionState = {
  activeProjectId?: string;
  setActiveProjectId: (id: string) => void;
};

export const useProductionStore = create<ProductionState>((set) => ({
  activeProjectId: undefined,
  setActiveProjectId: (id) => set({ activeProjectId: id })
}));
