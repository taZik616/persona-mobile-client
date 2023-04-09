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
  productDetail: {
    ticketId: number
  }
}

// INTERFACES

export interface CategoryInterface {
  id: string
  uri: string
  name?: string
  logoUri?: string
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
