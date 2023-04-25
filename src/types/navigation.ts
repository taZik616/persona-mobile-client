import {NavigatorScreenParams} from '@react-navigation/native'

import {ProductInBasketI, ProductPreviewInfo} from './interfaces'
import {helpDetailKey} from './utils'

export type TabParamList = {
  homeMain: undefined
  homeNewProducts: undefined
  homeBrands: undefined
  homeCatalog: NavigatorScreenParams<CatalogStackParamList>
  homeFavourites: undefined
  homeProfile: undefined
}

export type RootStackParamList = {
  home?: NavigatorScreenParams<TabParamList>
  productDetail: {productId: string; item?: ProductPreviewInfo}
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
  sizeChart: undefined
  buy: undefined
  fastBuy: {product: ProductInBasketI}
}

export type CatalogStackParamList = {
  categories: undefined
  subcategories: {
    categoryId: string
    headerTitle: string
  }
  products: {
    categoryId: string
    subcategoryId: string
  }
}
