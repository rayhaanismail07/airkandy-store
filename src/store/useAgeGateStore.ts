import { create } from 'zustand';

interface AgeGateStore {
  isVerified: boolean;
  isOpen: boolean;
  verifyAge: () => void;
  resetAgeGate: () => void;
}

const AGE_GATE_KEY = 'airkandy_age_verified_18';

export const useAgeGateStore = create<AgeGateStore>((set) => ({
  isVerified: typeof window !== 'undefined' ? localStorage.getItem(AGE_GATE_KEY) === 'true' : false,
  isOpen: typeof window !== 'undefined' ? localStorage.getItem(AGE_GATE_KEY) !== 'true' : true,

  verifyAge: () => {
    localStorage.setItem(AGE_GATE_KEY, 'true');
    set({ isVerified: true, isOpen: false });
  },

  resetAgeGate: () => {
    localStorage.removeItem(AGE_GATE_KEY);
    set({ isVerified: false, isOpen: true });
  }
}));
