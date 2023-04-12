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

import {persistedGenderReducer} from './genderSlice'
import {shopApi} from './shopApi'

export const store = configureStore({
  reducer: {
    [shopApi.reducerPath]: shopApi.reducer,
    gender: persistedGenderReducer,
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
