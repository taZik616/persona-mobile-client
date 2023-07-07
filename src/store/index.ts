import {configureStore} from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from 'react-redux'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from 'redux-persist'

import {ProductInBasketI} from 'src/types'

import {persistedBasketReducer} from './basketSlice'
import {persistedFavoritesReducer} from './favoritesSlice'
import {persistedGenderReducer} from './genderSlice'
import {persistedHintReducer} from './hintSlice'
import {profileReducer} from './profileSlice'
import {persistedRecentlyWatchedReducer} from './recentlyWatchedSlice'
import {shopApi} from './shopApi'

export const store = configureStore({
  reducer: {
    [shopApi.reducerPath]: shopApi.reducer,
    gender: persistedGenderReducer,
    hint: persistedHintReducer,
    recentlyWatched: persistedRecentlyWatchedReducer,
    favorites: persistedFavoritesReducer,
    profile: profileReducer,
    basket: persistedBasketReducer,
  },
  middleware: getMiddleware =>
    getMiddleware({
      serializableCheck: {
        /* ignore persistance actions */
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(shopApi.middleware),
})

export const persistor = persistStore(store)

// TYPES

export type StoreStateType = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

// Typed hooks
export const useTypedDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<StoreStateType> =
  useSelector
export const useTypedStore = () => useStore<StoreStateType>()

export const selectGender = (state: StoreStateType) => state.gender.gender

export const selectIsAuthenticated = (state: StoreStateType) =>
  state.profile.isAuthenticated
export const selectProfile = (state: StoreStateType) => state.profile
export const selectDiscountCardInfo = (state: StoreStateType) =>
  state.profile.discountCard

export const selectBasket = (state: StoreStateType) => state.basket.items
export const selectBasketPromocode = (state: StoreStateType) =>
  state.basket.promocode
export const selectBasketCounter = (state: StoreStateType) =>
  state.basket.counter
export const selectBasketIds = (state: StoreStateType) =>
  state.basket.productIds
export const selectBasketSelectedIds = (state: StoreStateType) =>
  state.basket.selectedItemIds

export const selectBasketSelectedItems = (state: StoreStateType) => {
  const items: ProductInBasketI[] = []
  state.basket.selectedItemIds.forEach(id => {
    const item = state.basket.items.find(a => a.productId === id)
    item && items.push(item)
  })
  return items
}

export const selectFavorites = (state: StoreStateType) => state.favorites.items
export const selectFavoritesCounter = (state: StoreStateType) =>
  state.favorites.counter
export const selectFavoritesIds = (state: StoreStateType) =>
  state.favorites.productIds

export const selectRecentlyWatched = (state: StoreStateType) =>
  state.recentlyWatched.items

export const selectSubs = ({
  profile: {subEmail, subPush, subSms},
}: StoreStateType) => ({subEmail, subPush, subSms})
