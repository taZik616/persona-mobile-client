import {PayloadAction, createSlice} from '@reduxjs/toolkit'

import {BasketItemInfoInterface} from 'src/types'

interface BasketSliceState {
  items: BasketItemInfoInterface[]
}

const fakeData: BasketItemInfoInterface[] = [
  {
    id: '1',
    productId: '68567',
    price: 18780,
    priceGroup: 'Основная',
    isAvailable: true,
    previewImages: [
      'http://89.108.71.146:8000/IMGS_Preview/preview_202109173648_x_5472_IMG_0778_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_202109173648_x_5472_IMG_0783_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_202109173648_x_5472_IMG_0775_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_202109173648_x_5472_IMG_0776_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_202109173648_x_5472_IMG_0772_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_202109173648_x_5472_IMG_0773_compressed.jpg',
    ],
    title: 'Перчатки PAUL SHARK',
    largeImages: [
      'http://89.108.71.146:8000/IMGS_Path/202109173648_x_5472_IMG_0778_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/202109173648_x_5472_IMG_0783_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/202109173648_x_5472_IMG_0775_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/202109173648_x_5472_IMG_0776_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/202109173648_x_5472_IMG_0772_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/202109173648_x_5472_IMG_0773_compressed.jpg',
    ],
    brandImage: 'http://89.108.71.146:8000/CAT_logo/599/paul_dfgdfgshark.png',
    brandName: 'PAUL SHARK',
  },
  {
    id: '2',
    productId: '68563',
    price: 12060,
    priceGroup: 'Основная',
    isAvailable: true,
    previewImages: [
      'http://89.108.71.146:8000/IMGS_Preview/preview_202109273000_x_4500_83_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_202110033000_x_4500_285_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_202110033000_x_4500_292_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_202110033000_x_4500_282_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_202110033000_x_4500_281_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_202109273000_x_4500_84_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_202109273000_x_4500_87_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_202110033000_x_4500_289_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_202110033000_x_4500_290_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_202110033000_x_4500_291_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_202110033000_x_4500_286_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_202110033000_x_4500_288_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_202110033000_x_4500_287_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_202109273000_x_4500_85_compressed.jpg',
    ],
    title: 'Шапка PAUL SHARK',
    largeImages: [
      'http://89.108.71.146:8000/IMGS_Path/202109273000_x_4500_83_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/202110033000_x_4500_285_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/202110033000_x_4500_292_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/202110033000_x_4500_282_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/202110033000_x_4500_281_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/202109273000_x_4500_84_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/202109273000_x_4500_87_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/202110033000_x_4500_289_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/202110033000_x_4500_290_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/202110033000_x_4500_291_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/202110033000_x_4500_286_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/202110033000_x_4500_288_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/202110033000_x_4500_287_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/202109273000_x_4500_85_compressed.jpg',
    ],
    brandImage: 'http://89.108.71.146:8000/CAT_logo/599/paul_dfgdfgshark.png',
    brandName: 'PAUL SHARK',
  },
  {
    id: '3',
    productId: '68560',
    price: 72660,
    priceGroup: 'Основная',
    isAvailable: false,
    previewImages: [
      'http://89.108.71.146:8000/IMGS_Preview/preview_202109283000_x_4500_127_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_202109283000_x_4500_126_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_202109283000_x_4500_128_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_202109283000_x_4500_129_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_202109283000_x_4500_130_compressed.jpg',
    ],
    title: 'Жилет PAUL SHARK',
    largeImages: [
      'http://89.108.71.146:8000/IMGS_Path/202109283000_x_4500_127_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/202109283000_x_4500_126_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/202109283000_x_4500_128_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/202109283000_x_4500_129_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/202109283000_x_4500_130_compressed.jpg',
    ],
    brandImage: 'http://89.108.71.146:8000/CAT_logo/599/paul_dfgdfgshark.png',
    brandName: 'PAUL SHARK',
  },
]

const initialState: BasketSliceState = {
  items: fakeData,
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    removeItem: (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.items = state.items.filter(it => it.id !== id)
    },
  },
})

export const {removeItem} = basketSlice.actions

export const basketReducer = basketSlice.reducer