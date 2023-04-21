export enum MainContentItemType {
  BrandsSwiper,
  BrandsList,
  CategoriesList,
  FashionList,
  FashionSwiper,
}

export interface HomeMainContentI {
  mainSwiperImages: string[]
  bannerCard?: string
  otherContent: HomeMainContentItem[]
}

export type BrandsListItem = {
  id: string
  brandId: string
  imgUri: string
  logoUri: string
}
export interface BrandsList {
  type: MainContentItemType.BrandsList
  items: BrandsListItem[]
}

export type BrandsSwiperItem = {
  id: string
  brandId: string
  imgUri: string
}
export interface BrandsSwiper {
  type: MainContentItemType.BrandsSwiper
  items: BrandsSwiperItem[]
}

export type CategoriesListItem = {
  id: string
  categoryId: string
  imgUri: string
  name: string
}
export interface CategoriesList {
  type: MainContentItemType.CategoriesList
  items: CategoriesListItem[]
}

export type FashionListItem = {
  id: string
  productIds: string[]
  imgUri: string
}
export interface FashionList {
  type: MainContentItemType.FashionList
  items: FashionListItem[]
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

export type HomeMainContentItem = (
  | BrandsList
  | BrandsSwiper
  | CategoriesList
  | FashionList
  | FashionSwiper
) & {title: string}
