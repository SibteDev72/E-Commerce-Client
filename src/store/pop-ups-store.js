import { create } from "zustand";

export const useStoreP = create((set) => ({
    isOpenCart: false,
    isOpenMenu: false,

    openCart: () => set(() => ({ isOpenCart: true })),
    closeCart: () => set(() => ({ isOpenCart: false })),
    
    openMenu: () => set(() => ({ isOpenMenu: true })),
    closeMenu: () => set(() => ({ isOpenMenu: false })),
}))