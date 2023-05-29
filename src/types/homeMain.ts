import {ProductsParams} from 'src/store/shopApi'

import {BrandType, CategoryType} from './interfaces'

export enum MainContentItemType {
  BrandsSwiper = 'BrandsSwiper',
  BrandsList = 'BrandsList',
  CategoriesList = 'CategoriesList',
  FashionList = 'FashionList',
  FashionSwiper = 'FashionSwiper',
}

export type MainSwiperImages = {
  id: number
  imageUrl: string
  productFilters: ProductsParams
}

export type BrandsListItem = {
  id: string
  brand: BrandType
  imgUri: string
  queryFilters?: ProductsParams
}
export interface BrandsList {
  type: MainContentItemType.BrandsList
  items: BrandsListItem[]
}

export type BrandsSwiperItem = {
  id: string
  brand: BrandType
  imgUri: string
  queryFilters?: ProductsParams
}
export interface BrandsSwiper {
  type: MainContentItemType.BrandsSwiper
  items: BrandsSwiperItem[]
}

export type CategoriesListItem = {
  id: string
  imgUri: string
  category: CategoryType
  queryFilters?: ProductsParams
}
export interface CategoriesList {
  type: MainContentItemType.CategoriesList
  items: CategoriesListItem[]
}

export type FashionListItemT = {
  id: string
  imgUri: string
  productIds: string[]
}
export interface FashionList {
  type: MainContentItemType.FashionList
  items: FashionListItemT[]
}

export type FashionSwiperItem = {
  id: string
  productIds: string[]
  imgUri: string
}
export interface FashionSwiper {
  type: MainContentItemType.FashionSwiper
  items: FashionSwiperItem[]
}

export type AnyContentPartItem = FashionSwiperItem &
  FashionListItemT &
  CategoriesListItem &
  BrandsSwiperItem &
  BrandsSwiperItem

export type HomeMainContentItem = (
  | BrandsList
  | BrandsSwiper
  | CategoriesList
  | FashionList
  | FashionSwiper
) & {title: string}

export interface HomeMainContentI {
  mainSwiperImages: MainSwiperImages[]
  bannerCard?: string
  otherContent: HomeMainContentItem[]
}
