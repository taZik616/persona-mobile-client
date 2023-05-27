import {NavigatorScreenParams} from '@react-navigation/native'

import {ProductInBasketI, ProductPreviewInfo} from './interfaces'
import {helpfulInfoKey} from './utils'

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
  productDetail: {productId: string; product?: ProductPreviewInfo}
  loyaltyCardAdd: undefined
  help: undefined
  helpDetail: {
    title: string
    queryPath: helpfulInfoKey
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
  giftCard: undefined
  allProducts: {
    showGenderSelect?: boolean
    brandIds?: string[]
    categoryId?: string
    search?: string
  }
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
