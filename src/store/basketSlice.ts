import {APP_API_URL} from '@env'
import {PayloadAction, createSlice} from '@reduxjs/toolkit'

import {getArrayOfField} from 'src/helpers'
import {ProductInBasketI} from 'src/types'

import {transformProductsResponse} from './shopApi'

import {StoreStateType} from '.'

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

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ProductInBasketI[]>) => {
      const items = action.payload
      state.items = items
      state.counter = items.length
      state.productIds = getArrayOfField(items, 'productId')
      state.selectedItemIds = state.selectedItemIds.filter(a =>
        items.some(b => b.productId === a),
      )
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
    removeItem: (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.items = state.items.filter(it => it.productId !== id)
      state.counter = state.items.length
      state.productIds = getArrayOfField(state.items, 'productId')
      state.selectedItemIds = state.selectedItemIds.filter(a => a !== id)
    },
    selectItem: (state, action: PayloadAction<string>) => {
      const productId = action.payload
      if (!state.selectedItemIds.includes(productId)) {
        state.selectedItemIds = [...state.selectedItemIds, productId]
      }
    },
    deselectItem: (state, action: PayloadAction<string>) => {
      const productId = action.payload
      state.selectedItemIds = state.selectedItemIds.filter(a => a !== productId)
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
  (item: ProductInBasketI) =>
  async (dispatch: any, getState: () => StoreStateType) => {
    fetch('http://89.108.71.146:8000/basket/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: getState().profile.authToken ?? '',
      },
      body: JSON.stringify({
        IdProduct: item.productId,
      }),
    })
    dispatch(addItem(item))
  }
/**
 * Загрузить с сервера корзину пользователя
 */
export const loadItemsToBasket = async (
  dispatch: any,
  getState: () => StoreStateType,
) => {
  const res = await (
    await fetch(`${APP_API_URL}/basket/`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: getState().profile.authToken ?? '',
      },
    })
  ).json()

  if (Array.isArray(res.Products)) {
    // console.log(
    //   '🚀 - transformProductsResponse(res):',
    //   transformProductsResponse(res),
    // )
    dispatch(setBasketItems(transformProductsResponse(res.Products)))
  }
}
/**
 * Удалить элемент по productId из корзины
 */
export const removeItemFromBasket =
  (productId: string) =>
  async (dispatch: any, getState: () => StoreStateType) => {
    fetch('http://89.108.71.146:8000/basket/', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: getState().profile.authToken ?? '',
      },
      body: JSON.stringify({
        IdProduct: productId,
      }),
    })
    dispatch(removeItem(productId))
  }

export const basketReducer = basketSlice.reducer

// const fakeData: ProductInBasketI[] = [
//   {
//     productId: '68567',
//     price: 18780,
//     priceGroup: 'Основная',
//     isAvailable: true,
//     previewImages: [
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202109173648_x_5472_IMG_0778_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202109173648_x_5472_IMG_0783_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202109173648_x_5472_IMG_0775_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202109173648_x_5472_IMG_0776_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202109173648_x_5472_IMG_0772_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202109173648_x_5472_IMG_0773_compressed.jpg',
//     ],
//     title: 'Перчатки PAUL SHARK',
//     largeImages: [
//       'http://89.108.71.146:8000/IMGS_Path/202109173648_x_5472_IMG_0778_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Path/202109173648_x_5472_IMG_0783_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Path/202109173648_x_5472_IMG_0775_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Path/202109173648_x_5472_IMG_0776_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Path/202109173648_x_5472_IMG_0772_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Path/202109173648_x_5472_IMG_0773_compressed.jpg',
//     ],
//     brandImage: 'http://89.108.71.146:8000/CAT_logo/599/paul_dfgdfgshark.png',
//     brandName: 'PAUL SHARK',
//   },
//   {
//     productId: '68563',
//     price: 12060,
//     priceGroup: 'Основная',
//     isAvailable: true,
//     previewImages: [
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202109273000_x_4500_83_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202110033000_x_4500_285_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202110033000_x_4500_292_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202110033000_x_4500_282_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202110033000_x_4500_281_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202109273000_x_4500_84_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202109273000_x_4500_87_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202110033000_x_4500_289_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202110033000_x_4500_290_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202110033000_x_4500_291_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202110033000_x_4500_286_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202110033000_x_4500_288_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202110033000_x_4500_287_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202109273000_x_4500_85_compressed.jpg',
//     ],
//     title: 'Шапка PAUL SHARK',
//     largeImages: [
//       'http://89.108.71.146:8000/IMGS_Path/202109273000_x_4500_83_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Path/202110033000_x_4500_285_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Path/202110033000_x_4500_292_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Path/202110033000_x_4500_282_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Path/202110033000_x_4500_281_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Path/202109273000_x_4500_84_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Path/202109273000_x_4500_87_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Path/202110033000_x_4500_289_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Path/202110033000_x_4500_290_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Path/202110033000_x_4500_291_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Path/202110033000_x_4500_286_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Path/202110033000_x_4500_288_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Path/202110033000_x_4500_287_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Path/202109273000_x_4500_85_compressed.jpg',
//     ],
//     brandImage: 'http://89.108.71.146:8000/CAT_logo/599/paul_dfgdfgshark.png',
//     brandName: 'PAUL SHARK',
//   },
//   {
//     productId: '68560',
//     price: 72660,
//     priceGroup: 'Основная',
//     isAvailable: false,
//     previewImages: [
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202109283000_x_4500_127_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202109283000_x_4500_126_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202109283000_x_4500_128_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202109283000_x_4500_129_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Preview/preview_202109283000_x_4500_130_compressed.jpg',
//     ],
//     title: 'Жилет PAUL SHARK',
//     largeImages: [
//       'http://89.108.71.146:8000/IMGS_Path/202109283000_x_4500_127_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Path/202109283000_x_4500_126_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Path/202109283000_x_4500_128_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Path/202109283000_x_4500_129_compressed.jpg',
//       'http://89.108.71.146:8000/IMGS_Path/202109283000_x_4500_130_compressed.jpg',
//     ],
//     brandImage: 'http://89.108.71.146:8000/CAT_logo/599/paul_dfgdfgshark.png',
//     brandName: 'PAUL SHARK',
//   },
// ]
