// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import berriesReducer from './slices/berriesSlice'
import productsReducer from './slices/productsSlice'

export const store = configureStore({
  reducer: {
    berries: berriesReducer,
    products: productsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
