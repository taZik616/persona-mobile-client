import {APP_API_URL} from '@env'
import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

import {getArrayOfField} from 'src/helpers'
import {ProductInBasketI} from 'src/types'

import {store} from '.'
interface BasketSliceState {
  items: ProductInBasketI[]
  counter: number
  // Для быстрого определения что товар находиться в корзине
  productIds: string[]
  selectedItemIds: string[]
}

const initialState: BasketSliceState = {
  items: [],
  counter: 0,
  productIds: [],
  selectedItemIds: [],
}

type SelectionIds = {productId: string; variantId: string}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ProductInBasketI[]>) => {
      const items = action.payload
      state.items = items
      state.counter = items.length
      state.productIds = getArrayOfField(items, 'productId')
      state.selectedItemIds = []
    },
    addItem: (state, action: PayloadAction<ProductInBasketI>) => {
      const newItem = action.payload
      if (
        state.items.findIndex(it => it.productId === newItem.productId) === -1
      ) {
        state.items = [...state.items, newItem]
        state.counter = state.items.length
        state.productIds = getArrayOfField(state.items, 'productId')
      }
    },
    removeItem: (state, action: PayloadAction<ProductInBasketI>) => {
      const productId = action.payload.productId
      const variantId = action.payload.variant.uniqueId
      state.items = state.items.filter(
        it => it.productId !== productId && it.variant.uniqueId !== variantId,
      )
      state.counter = state.items.length
      state.productIds = getArrayOfField(state.items, 'productId')
      state.selectedItemIds = state.selectedItemIds.filter(a => a !== productId)
    },
    selectItem: (state, action: PayloadAction<SelectionIds>) => {
      const {productId, variantId} = action.payload
      const selectionId = `${productId}-${variantId}`
      if (!state.selectedItemIds.includes(selectionId)) {
        state.selectedItemIds = [...state.selectedItemIds, selectionId]
      }
    },
    deselectItem: (state, action: PayloadAction<SelectionIds>) => {
      const {productId, variantId} = action.payload
      const selectionId = `${productId}-${variantId}`
      state.selectedItemIds = state.selectedItemIds.filter(
        a => a !== selectionId,
      )
    },
    clearSelect: state => {
      state.selectedItemIds = []
    },
  },
})

const {removeItem, addItem} = basketSlice.actions

export const {
  setItems: setBasketItems,
  selectItem: selectBasketItem,
  deselectItem: deselectBasketItem,
  clearSelect: clearBasketSelect,
} = basketSlice.actions
/**
 * Добавить 1 элемент в корзину
 */
export const addItemToBasket =
  (item: ProductInBasketI) => async (dispatch: any) => {
    const token = store.getState().profile.authToken ?? ''
    axios.put(
      `${APP_API_URL}/api/v1/basket`,
      {
        productId: item.productId,
        variantId: item.variant.uniqueId,
      },
      {headers: {Authorization: token ? `Token ${token}` : ''}},
    )
    dispatch(addItem(item))
  }
/**
 * Загрузить с сервера корзину пользователя
 */
export const loadItemsToBasket = async (dispatch: any) => {
  const token = store.getState().profile.authToken ?? ''
  const res = await axios.get(`${APP_API_URL}/api/v1/basket`, {
    headers: {Authorization: token ? `Token ${token}` : ''},
  })

  if (Array.isArray(res.data.items)) {
    const data = res.data.items.map((a: any) => ({
      ...a.product,
      variant: a.variant,
    }))
    dispatch(setBasketItems(data))
  }
}
/**
 * Удалить элемент по productId из корзины
 */
export const removeItemFromBasket =
  (item: ProductInBasketI) => async (dispatch: any) => {
    const token = store.getState().profile.authToken ?? ''
    axios.delete(`${APP_API_URL}/api/v1/basket`, {
      data: {
        productId: item.productId,
        variantId: item.variant.uniqueId,
      },
      headers: {Authorization: token ? `Token ${token}` : ''},
    })
    dispatch(removeItem(item))
  }

export const basketReducer = basketSlice.reducer
