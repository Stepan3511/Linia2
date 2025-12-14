import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IPromoCode } from "@/types/promo-code.types";

interface PromoStoreState {
  promoCode: IPromoCode | null;
  setPromoCode: (promo: IPromoCode | null) => void;
}

export const usePromoStore = create<PromoStoreState>()(
  persist(
    (set) => ({
      promoCode: null,
      setPromoCode: (promo) => set({ promoCode: promo }),
    }),
    {
      name: "promo-code-storage", // Ключ в localStorage
    }
  )
);
