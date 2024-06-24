import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStoreW = create(
    persist((set, get) => ({
        wishlist: [],
        wishlistNumber: 0,
        addwishlistItem: (wishlistObjs) => { set((state) => ({
                wishlist: [...state.wishlist, wishlistObjs],
                wishlistNumber: state.wishlistNumber + 1
            })); 
        },
        wishlistStatusCheck: (itemID) => {
            const wishlist = get().wishlist;
            return wishlist.some(item => item._id === itemID);
        },
        deleteWishlistItem: (itemID) => {
            set((state) => ({
                wishlist: state.wishlist.filter(obj => obj._id !== itemID),
                wishlistNumber: state.wishlistNumber - 1
            }));
        },
        clearWishlist: () => {
            set({ wishlist: [], wishlistNumber: 0 })
            window.localStorage.removeItem('wishlist-storage');
        },
    }),
    {
        name: 'wishlist-storage',
    }
    )
);
