import {NavigatorScreenParams} from '@react-navigation/native'

import {ProductsParams} from 'src/store/shopApi'

import {ProductInBasketI, ProductPreviewInfo} from './interfaces'
import {helpfulInfoKey} from './utils'

export type TabParamList = {
  homeMain: undefined
  homeNewProducts: undefined
  homeBrands: undefined
  homeCatalog: NavigatorScreenParams<CatalogStackParamList>
  homeFavourites: undefined
  homeProfile?: {
    whenLoginGoToBasket?: boolean
  }
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
  recoveryPasswordComplete: {
    phoneNumber: string
    code: string
  }
  orders?: {
    needUpdateStatuses?: boolean
  }
  subscriptions: undefined
  basket: undefined
  sizeChart: undefined
  buy: {
    priceWithoutPersonalDiscount: number
    priceWithPersonalDiscount: number
  }
  fastBuy: {product: ProductInBasketI}
  giftCard: undefined
  allProducts?: ProductsParams & {
    genderIgnore?: boolean
    hideGenderSelect?: boolean
    showCategoriesFilter?: boolean
    showFilter?: boolean
  }
  myGiftCards?: {
    needUpdateStatuses?: boolean
  }
  payment: {
    formUrl: string
    orderFastBuyId?: string
  }
}

export type CatalogStackParamList = {
  categories: undefined
  subcategories: {
    categoryId: number
    headerTitle: string
  }
  products: {
    categoryId: number
    subcategoryId: number
  }
}

export interface DiscountCardInfoType {
  cardCode: boolean
  cardLevel: {
    discountPercent: number
    level: number
  }
  purchaseTotal: number
}
