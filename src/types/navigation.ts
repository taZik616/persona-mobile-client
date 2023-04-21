import {NavigatorScreenParams} from '@react-navigation/native'

import {ProductPreviewInfo} from './interfaces'
import {helpDetailKey} from './utils'

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
