export interface GetBrandsBody {
  gender?: 'men' | 'women'
  brandId?: string
  isTop?: 'True' | 'False'
}

export interface CreateOrderBody {
  productVariantIds: string
  promocode?: string
  address: string
}

export interface MintGiftCardBody {
  cardTypeId: number
  amount: number
}

export interface CreateFastOrderBody {
  productVariantId: string
  address: string
  phoneNumber: string
  name: string
}
export interface RecoveryPasswordSendCodeBody {
  phoneNumber: string
}

export interface RecoveryPasswordCompleteBody {
  phoneNumber: string
  supposedCode: string
  newPassword: string
}

export interface RecoveryPasswordCheckBody {
  phoneNumber: string
  supposedCode: string
}

export interface ChangePasswordBody {
  password: string
  newPassword: string
}

export interface CategoriesParams {
  gender?: 'men' | 'women'
  parentId?: number
  ordering?: string
  level?: number
}

export interface MightBeInterestedParams {
  productId: string
}

export interface LoginBody {
  username: string
  password: string
}
export interface CreateUserAndSendCodeBody {
  phoneNumber: string
  firstName?: string
  lastName?: string
}

export interface ResendRegistryCodeBody {
  phoneNumber: string
}

export type OrderingType =
  | 'price' // priceFromLow
  | '-price' // priceFromTop
  | 'lastUpdate' // latestUpdated
  | '-lastUpdate' //firstTheOldOnes

export interface ProductsParams {
  productId?: string
  brandIds?: string
  page?: number
  page_size?: number
  ordering?: OrderingType
  subcategoryId?: number
  categoryId?: number
  priceGroup?: string
  search?: string
  isNew?: 'True' | 'False'
  gender?: 'men' | 'women'
  sizes?: string
}
