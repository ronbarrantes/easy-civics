import { create } from "zustand";
import {
  devtools,
  // persist
} from "zustand/middleware";

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

export const useTestStore = create<BearState>()(
  devtools(
    // persist(
    (set) => ({
      bears: 0,
      increase: (by) => set((state) => ({ bears: state.bears + by })),
    }),
    { name: "Test Store" }
  )
  // )
);
