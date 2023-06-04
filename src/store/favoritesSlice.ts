import {APP_API_URL} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {persistReducer} from 'redux-persist'

import {getArrayOfField} from 'src/helpers'
import {ProductInFavoritesI} from 'src/types'

import {store} from '.'

interface FavoritesSliceState {
  items: ProductInFavoritesI[]
  counter: number
  // Для быстрого определения что товар находиться в избранном
  productIds: string[]
}

const initialState: FavoritesSliceState = {
  items: [],
  counter: 0,
  productIds: [],
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ProductInFavoritesI[]>) => {
      const items = action.payload
      state.items = items
      state.counter = items.length
      state.productIds = getArrayOfField(items, 'productId')
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.items = state.items.filter(it => it.productId !== id)
      state.counter = state.items.length
      state.productIds = getArrayOfField(state.items, 'productId')
    },
    addItem: (state, action: PayloadAction<ProductInFavoritesI>) => {
      const newItem = action.payload
      if (
        state.items.findIndex(it => it.productId === newItem.productId) === -1
      ) {
        state.items = [...state.items, newItem]
        state.counter = state.items.length
        state.productIds = getArrayOfField(state.items, 'productId')
      }
    },
  },
})

const {setItems, removeItem, addItem} = favoritesSlice.actions
export const {setItems: setFavoritesItems} = favoritesSlice.actions
/**
 * Добавить 1 элемент в избранное
 */
export const addItemToFavorites =
  (item: ProductInFavoritesI) => async (dispatch: any) => {
    const token = store.getState().profile.authToken ?? ''
    axios.put(
      `${APP_API_URL}/api/v1/favorites`,
      {productId: item.productId},
      {headers: {Authorization: token ? `Token ${token}` : ''}},
    )
    dispatch(addItem(item))
  }
/**
 * Загрузить с сервера избранные товары пользователя
 */
export const loadItemsToFavorites = async (dispatch: any) => {
  const token = store.getState().profile.authToken ?? ''
  if (token) {
    const res = await axios.get(`${APP_API_URL}/api/v1/favorites`, {
      headers: {Authorization: `Token ${token}`},
    })
    const data = res.data.items.map((a: any) => ({
      ...a.product,
    }))
    dispatch(setItems(data))
  }
}
/**
 * Удалить элемент по productId из избранного
 */
export const removeItemFromFavorites =
  (productId: string) => async (dispatch: any) => {
    const token = store.getState().profile.authToken ?? ''
    axios.delete(`${APP_API_URL}/api/v1/favorites`, {
      headers: {Authorization: token ? `Token ${token}` : ''},
      data: {productId},
    })
    dispatch(removeItem(productId))
  }

export const favoritesReducer = favoritesSlice.reducer

const favoritesPersistConfig = {
  key: 'favorites',
  version: 1,
  storage: AsyncStorage,
}

export const persistedFavoritesReducer = persistReducer(
  favoritesPersistConfig,
  favoritesReducer,
)
