import {ProductsParams} from 'src/store/shopApi'

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

export interface CategoryOrBrandInterface {
  id: string
  uri: string
  name?: string
  logoUri?: string
}

export interface BrandType {
  brandId: string
  name: string
  logo: string
  description: string
  gender: 'men' | 'women'
  isTop: boolean
}
export interface ProductImage {
  priority: number
  compressedImage: string
  originalImage: string
}
export interface ProductVariant {
  size: string
  color: string
  colorHex: string
  uniqueId: string
  price: number
  isAvailable: boolean
}
export interface ProductPreviewInfo {
  productId: string
  productName: string
  price: number
  priceGroup: string
  collection?: string
  onlyOneVariant?: string
  isAvailable: boolean
  brand?: BrandType
  images: ProductImage[]
}

export interface ProductsDataI {
  count: number
  data: ProductPreviewInfo[]
}
export interface ProductInBasketI extends ProductPreviewInfo {
  variant: ProductVariant
}

export interface ProductInFavoritesI extends ProductPreviewInfo {}

export interface ProductDetailInfo {
  productId: string
  productName: string
  price: number
  priceGroup: string
  onlyOneVariant: boolean
  collection: string
  brand?: BrandType
  images: ProductImage[]
  variants: ProductVariant[]
  description: string
  isAvailable: boolean

  manufacturer: string
  country: string
  podklad: string
  sostav: string
}

export interface CategoryI {
  categoryId: string
  name: string
  gender?: 'men' | 'women'
  parentId?: string
  image?: string
}

export interface OrderingItemI {
  name: string
  id: ProductsParams['ordering']
}
