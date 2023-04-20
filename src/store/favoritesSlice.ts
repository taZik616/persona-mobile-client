import AsyncStorage from '@react-native-async-storage/async-storage'
import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'

import {getArrayOfField} from 'src/helpers'
import {FavoriteItemInfoInterface} from 'src/types'

interface FavoritesSliceState {
  items: FavoriteItemInfoInterface[]
  counter: number
  // Для быстрого определения что товар находиться в избранном
  productIds: string[]
}

const fakeData: FavoriteItemInfoInterface[] = [
  {
    id: '1',
    productId: '74896',
    price: 145900,
    priceGroup: 'Распродажа 20%',
    previewImages: [
      'http://89.108.71.146:8000/IMGS_Preview/preview_20220406_3648_x_5472IMG_0097_2__compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_20220406_3648_x_5472IMG_0100_3__compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_20220406_3648_x_5472IMG_0101_2__compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_20220406_3648_x_5472IMG_0095_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_20220406_3648_x_5472IMG_0101_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_20220406_3648_x_5472IMG_0100_compressed.jpg',
    ],
    isAvailable: true,
    title: 'Костюм PHILIPP PLEIN',
    largeImages: [
      'http://89.108.71.146:8000/IMGS_Path/20220406_3648_x_5472IMG_0097_2__compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/20220406_3648_x_5472IMG_0100_3__compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/20220406_3648_x_5472IMG_0101_2__compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/20220406_3648_x_5472IMG_0095_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/20220406_3648_x_5472IMG_0101_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/20220406_3648_x_5472IMG_0100_compressed.jpg',
    ],
    brandImage:
      'http://89.108.71.146:8000/CAT_logo/167/Rhilipp_dfgdfggdRlein.jpg',
    brandName: 'PHILIPP PLEIN',
  },
  {
    id: '2',
    productId: '76077',
    price: 14450,
    priceGroup: 'Основная',
    previewImages: [
      'http://89.108.71.146:8000/IMGS_Preview/preview_2000000741864PRDM077_1_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_2000000741864PRDM080_1_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_2000000741864PRDM076_1_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_2000000741864PRDM081_1_.JPG_compressed.jpg',
    ],
    isAvailable: true,
    title: 'Сумка MC2 SAINT BARTH',
    largeImages: [
      'http://89.108.71.146:8000/IMGS_Path/2000000741864PRDM077_1_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/2000000741864PRDM080_1_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/2000000741864PRDM076_1_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/2000000741864PRDM081_1_.JPG_compressed.jpg',
    ],
    brandName: 'Сумки',
  },
  {
    id: '3',
    productId: '76255',
    price: 20450,
    priceGroup: 'Основная',
    previewImages: [
      'http://89.108.71.146:8000/IMGS_Preview/preview_2000000736655MAN031_11_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_2000000736655MAN030_1_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_2000000736655MOD069_1_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_2000000736655PRDM102_2_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_2000000736655PRDM103_2_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_2000000736655PRDM101_2_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_2000000737416MAN051_1_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_2000000737416MAN052_1_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_2000000737416MAN05011_1_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_2000000737416PRDM105_2_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_2000000737416PRDM106_2_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_2000000737416PRDM104_2_.JPG_compressed.jpg',
    ],
    isAvailable: true,
    title: 'Футболка ESCADA SPORT',
    largeImages: [
      'http://89.108.71.146:8000/IMGS_Path/2000000736655MAN031_11_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/2000000736655MAN030_1_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/2000000736655MOD069_1_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/2000000736655PRDM102_2_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/2000000736655PRDM103_2_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/2000000736655PRDM101_2_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/2000000737416MAN051_1_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/2000000737416MAN052_1_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/2000000737416MAN05011_1_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/2000000737416PRDM105_2_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/2000000737416PRDM106_2_.JPG_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/2000000737416PRDM104_2_.JPG_compressed.jpg',
    ],
    brandImage:
      'http://89.108.71.146:8000/CAT_logo/164/escada_sportapr_vector_2662.png',
    brandName: 'ESCADA SPORT',
  },
]

const initialState: FavoritesSliceState = {
  items: fakeData,
  counter: fakeData.length,
  productIds: getArrayOfField(fakeData, 'productId'),
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<FavoriteItemInfoInterface[]>) => {
      const items = action.payload
      state.items = items
      state.counter = items.length
      state.productIds = getArrayOfField(items, 'productId')
    },
    mergeItems: (state, action: PayloadAction<FavoriteItemInfoInterface[]>) => {
      const items = action.payload
      state.items = [...state.items, ...items]
      state.counter = state.items.length
      state.productIds = getArrayOfField(state.items, 'productId')
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.items = state.items.filter(it => it.productId !== id)
      state.counter = state.items.length
      state.productIds = getArrayOfField(state.items, 'productId')
    },
    addItem: (state, action: PayloadAction<FavoriteItemInfoInterface>) => {
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

export const {
  mergeItems: mergeItemsInFavorites,
  setItems: setItemsInFavorites,
  removeItem: removeItemFromFavorites,
  addItem: addItemToFavorites,
} = favoritesSlice.actions

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