import {OrderingType} from 'src/store/shopApi'

export interface OrderInfoInterface {
  orderId: number
  totalSum: number
  status: 'NotPaid' | 'AlreadyPaid' | 'Mistaken' | 'Delivery' | 'Received'
  orderSberId: number
  address: string
  productsInfo: ProductInBasketI[]
}

export interface BrandType {
  brandId: string
  name: string
  logo: string
  description: string
  gender: 'men' | 'women'
  isTop: boolean
}

export interface GiftCardTypeI {
  id: number
  image: string
  title: string
  description: string
  amountVariants: number[]
}

export interface GiftCardInterface {
  balance: number
  cardType: GiftCardTypeI
  promocode: string
  isActive: boolean
}

export interface CategoryType {
  categoryId: number
  name: string
  gender: 'men' | 'women'
  parentId: string
  image?: string
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
  discountPercent: number
}
export interface ProductPreviewInfo {
  productId: string
  productName: string
  price: number
  priceGroup: string
  discountPercent: number
  collection?: string
  onlyOneVariant?: string
  isAvailable: boolean
  brand?: BrandType
  images: ProductImage[]
}

export interface ProductsDataI {
  count: number
  products: ProductPreviewInfo[]
  filters: {
    sizes: string[]
  }
}
export interface ProductInBasketI extends ProductPreviewInfo {
  variant: ProductVariant
  personalDiscountInRub?: number
}

export interface ProductInFavoritesI extends ProductPreviewInfo {}

export interface ProductDetailInfo {
  productId: string
  productName: string
  price: number
  priceGroup: string
  discountPercent: number
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

  article: string
}

export interface OrderingItemI {
  name: string
  value: OrderingType
}
