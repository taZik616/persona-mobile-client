import {APP_API_URL} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {persistReducer} from 'redux-persist'

import {getArrayOfField} from 'src/helpers'
import {ProductInBasketI} from 'src/types'

import {store} from '.'

interface BasketSliceState {
  items: ProductInBasketI[]
  counter: number
  // Для быстрого определения что товар находиться в корзине
  productIds: string[]
  selectedItemIds: string[]
  promocode?: string
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
        state.items.findIndex(
          it =>
            it.productId === newItem.productId &&
            it.variant.uniqueId === newItem.variant.uniqueId,
        ) === -1
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
      state.selectedItemIds = state.selectedItemIds.filter(
        a => a !== `${productId}-${variantId}`,
      )
    },
    removeItemByIds: (
      state,
      action: PayloadAction<{productId: string; variantId: string}>,
    ) => {
      const {productId, variantId} = action.payload
      state.items = state.items.filter(
        it => it.productId !== productId && it.variant.uniqueId !== variantId,
      )
      state.counter = state.items.length
      state.productIds = getArrayOfField(state.items, 'productId')
      state.selectedItemIds = state.selectedItemIds.filter(
        a => a !== `${productId}-${variantId}`,
      )
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
    setPromocode: (state, action: PayloadAction<string | undefined>) => {
      state.promocode = action.payload
    },
  },
})

const {removeItem, addItem, removeItemByIds} = basketSlice.actions

export const {
  setItems: setBasketItems,
  selectItem: selectBasketItem,
  deselectItem: deselectBasketItem,
  clearSelect: clearBasketSelect,
  setPromocode: setBasketPromocode,
} = basketSlice.actions

export const personalDiscountBasketCalc = async (dispatch: any) => {
  const token = store.getState().profile.authToken ?? ''
  const {items, promocode} = store.getState().basket
  if (items.length) {
    const res = await axios.get(
      `${APP_API_URL}/api/v1/order-personal-discount-calc`,
      {
        params: {
          productVariantIds: items.map(a => a.variant.uniqueId).join(','),
          promocode,
        },
        headers: {Authorization: token ? `Token ${token}` : ''},
      },
    )
    const products = res.data?.products

    if (products) {
      dispatch(
        setBasketItems(
          products.map((a: any) => ({
            ...a.product,
            variant: a.variant,
            personalDiscountInRub: a.personalDiscountInRub,
          })),
        ),
      )
    }
  }
}
/**
 * Добавить 1 элемент в корзину
 */
export const addItemToBasket =
  (item: ProductInBasketI) => async (dispatch: any) => {
    const token = store.getState().profile.authToken ?? ''
    if (token) {
      axios.put(
        `${APP_API_URL}/api/v1/basket`,
        {
          productId: item.productId,
          variantId: item.variant.uniqueId,
        },
        {headers: {Authorization: token ? `Token ${token}` : ''}},
      )
    }
    dispatch(addItem(item))
  }
/**
 * Загрузить с сервера корзину пользователя
 */
export const loadItemsToBasket = async (dispatch: any) => {
  const token = store.getState().profile.authToken ?? ''
  const localBasketItems = store.getState().basket.items
  if (localBasketItems.length > 0) {
    await axios.post(`${APP_API_URL}/api/v1/clear-basket`, undefined, {
      headers: {Authorization: token ? `Token ${token}` : ''},
    })
    localBasketItems.forEach(item => {
      axios.put(
        `${APP_API_URL}/api/v1/basket`,
        {
          productId: item.productId,
          variantId: item.variant.uniqueId,
        },
        {headers: {Authorization: token ? `Token ${token}` : ''}},
      )
    })
  } else {
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
}
/**
 * Удалить элемент из корзины
 */
export const removeItemFromBasket =
  (item: ProductInBasketI) => async (dispatch: any) => {
    const token = store.getState().profile.authToken ?? ''
    if (token) {
      axios.delete(`${APP_API_URL}/api/v1/basket`, {
        data: {
          productId: item.productId,
          variantId: item.variant.uniqueId,
        },
        headers: {Authorization: token ? `Token ${token}` : ''},
      })
    }
    dispatch(removeItem(item))
  }

/**
 * Удалить элемент из корзины по selectedId
 */
export const removeItemFromBasketByIds =
  (ids: string[]) => async (dispatch: any) => {
    const token = store.getState().profile.authToken ?? ''
    ids.forEach(id => {
      const [productId, variantId] = id.split('-')
      if (token) {
        axios.delete(`${APP_API_URL}/api/v1/basket`, {
          data: {productId, variantId},
          headers: {Authorization: token ? `Token ${token}` : ''},
        })
      }
      dispatch(removeItemByIds({productId, variantId}))
    })
  }

export const basketReducer = basketSlice.reducer

const basketPersistConfig = {
  key: 'basket',
  version: 1,
  storage: AsyncStorage,
}

export const persistedBasketReducer = persistReducer(
  basketPersistConfig,
  basketReducer,
)
