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
  categoryName?: string
}
export interface ProductInBasketI extends ProductPreviewInfo {
  size?: string
  color?: string
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

export interface CategoryI {
  image: string
  title: string
  categoryId: string
  fullTitle: string
}
