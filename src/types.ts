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
  productDetail: Partial<ProductPreviewInfo> & {productId: string}
  loyaltyCardAdd: undefined
  help: undefined
  helpDetail: {
    title: string
    queryPath: helpDetailKey
  }
  personalEdit: undefined
  personal: undefined
  changePassword: undefined
  recoveryPasswordEnterPhone: undefined
  recoveryPasswordConfirm: {
    telephone: string
  }
  orders: undefined
  subscriptions: undefined
  basket: undefined
}

// INTERFACES

export interface BasketItemInfoInterface extends ProductPreviewInfo {
  id: string
}

export interface FavoriteItemInfoInterface extends ProductPreviewInfo {
  id: string
}

export interface OrderInfoInterface {
  id: string
  status: 'rejected' | 'progress' | 'completed'
  totalPrice: number
  items: OrderItemInterface[]
}

export interface OrderItemInterface {
  productId: string
  title: string
  category: string
  image: string
}

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

export type helpDetailKey =
  | 'exchange_and_return'
  | 'terms_of_sale'
  | 'privacy_policy'
  | 'payment_policy'
  | 'contacts'
  | 'delivery'

export type sheetPointsT = [number, number]

export type ArrayElementType<
  ArrayType extends readonly unknown[] | null | undefined,
> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never
