import { create } from 'zustand';
import { persist } from "zustand/middleware";

export const useStoreWeeklySale = create(
    persist((set) => ({
        totalSales: 0,
        weekDaysSale: {
            'Mon': 0,
            'Tue': 0,
            'Wed': 0,
            'Thu': 0,
            'Fri': 0,
            'Sat': 0,
            'Sun': 0,
        },
        updateTotalSales: (sale) => set((state) => ({ totalSales: state.totalSales + sale })),
        updateSale: (day, sale) => {
            if(day === 'Monday'){
                set((state) => ({weekDaysSale: {...state.weekDaysSale, 'Mon':sale+parseInt(state.weekDaysSale.Mon)}}))
            }else if(day === 'Tuesday'){
                set((state) => ({weekDaysSale: {...state.weekDaysSale, 'Tue':sale+parseInt(state.weekDaysSale.Tue)}}))
            }else if(day === 'Wednesday'){
                set((state) => ({weekDaysSale: {...state.weekDaysSale, 'Wed':sale+parseInt(state.weekDaysSale.Wed)}}))
            }else if(day === 'Thursday'){
                set((state) => ({weekDaysSale: {...state.weekDaysSale, 'Thu':sale+parseInt(state.weekDaysSale.Thu)}}))
            }else if(day === 'Friday'){
                set((state) => ({weekDaysSale: {...state.weekDaysSale, 'Fri':sale+parseInt(state.weekDaysSale.Fri)}}))
            }else if(day === 'Saturday'){
                set((state) => ({weekDaysSale: {...state.weekDaysSale, 'Sat':sale+parseInt(state.weekDaysSale.Sat)}}))
            }else if(day === 'Sunday'){
                set((state) => ({weekDaysSale: {...state.weekDaysSale, 'Sun':sale+parseInt(state.weekDaysSale.Sun)}}))
            }
        }
    }),
    {
        name: 'weeklySale-storage',
    }
    )
)
