import {NavigatorScreenParams} from '@react-navigation/native'

// NAVIGATION

export type TabParamList = {
  homeMain: undefined
  homeNewProducts: undefined
  homeBrands: undefined
  homeCatalog: undefined
  homeFavourites: undefined
  homeProfile: undefined
}

export type RootStackParamList = {
  home?: NavigatorScreenParams<TabParamList>
  settings: undefined
  productDetail: Partial<ProductPreviewInfo> & {productId: string}
}

// INTERFACES

export interface CategoryInterface {
  id: string
  uri: string
  name?: string
  logoUri?: string
}

export interface ProductPreviewInfo {
  productId: string
  title: string
  price: number
  previewImages: string[]
  priceGroup: string
  isAvailable: boolean
  largeImages: string[]
  brandImage?: string
  collection?: string
  brandName?: string
}

export interface ProductDetailInfo {
  productId: string
  title: string
  description: string
  code: string
  brand: string
  specifications: {
    [name: string]: {name: string; value: string}
    // manufacturer?: {name: 'Мануфактура'; value: 'хорошая'}
    // country?: {name: 'Страна'; value: 'Россия'}
  }
  price: number
  priceGroup: string
  isAvailable: boolean
  largeImages: string[]
  brandImage?: string
  collection?: string
  brandName?: string
}

// UTILS

export type InputNameType =
  | 'eventName'
  | 'location'
  | 'country'
  | 'price'
  | 'cover'
  | 'categories'
  | 'date'

export type EventError =
  | 'eventName'
  | 'location'
  | 'country'
  | 'date'
  | 'price'
  | 'none'

export type sheetPointsT = [number, number]

export type ArrayElementType<
  ArrayType extends readonly unknown[] | null | undefined,
> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never
