import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
    persist((set, get) => ({
        cart: [],
        cartNumber: 0,
        cartItemsTotal: 0,
        addCart: (cartObjs) => { 
            const cart = get().cart;
            const exist = cart.some(item => item['ProductCode'] === cartObjs['ProductCode']);
            if( !exist ){
                set((state) => ({
                    cart: [...state.cart, cartObjs],
                })); 
                get().calculateSum('ProductQuantity')
                get().calculateSum('ProductPrice')
            }
        },
        deleteCartItem: (itemIndex) => {
            set((state) => ({
                cart: state.cart.filter((_, i) => i !== itemIndex)
            }));
            get().calculateSum('ProductQuantity')
            get().calculateSum('ProductPrice')
        },
        updateCartItem: (index, updatedValues) => {
            set((state) => ({
                cart: state.cart.map((obj, i) => 
                    i === index ? { ...obj, ...updatedValues } : obj     
                )
            }));
            get().calculateSum('ProductQuantity')
            get().calculateSum('ProductPrice')
        },
        clearCart: () => {
            set({ cart: [], cartNumber: 0, cartItemsTotal: 0 })
            window.localStorage.removeItem('cart-storage');
        },
        calculateSum: (field) => {
            const { cart } = get();
            if(field === 'ProductQuantity'){
                const cartNumber = cart.reduce((total, obj) => total + (obj[field] || 0), 0);
                set({ cartNumber });
            }else if(field === 'ProductPrice'){
                const cartItemsTotal = cart.reduce((total, obj) => total + (obj[field] || 0), 0);
                set({ cartItemsTotal });
            }
        },
    }),
    {
        name: 'cart-storage',
    }
    )
);
