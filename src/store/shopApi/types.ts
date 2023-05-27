export interface GetBrandsBody {
  gender?: 'men' | 'women'
  brandId?: string
  isTop?: 'True' | 'False'
}

export interface RecoveryPasswordSendCodeBody {
  phoneNumber: string
}

export interface RecoveryPasswordConfirmBody {
  phoneNumber: string
  supposedCode: string
  newPassword: string
}

export interface ChangePasswordBody {
  password: string
  newPassword: string
}

export interface CategoriesBody {
  gender?: 'men' | 'women'
  parentId?: number
  ordering?: string
  level?: number
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

export interface ProductsParams {
  productId?: string
  brand__brandId?: string
  page?: number
  page_size?: number
  ordering?:
    | 'price' // priceFromLow
    | '-price' // priceFromTop
    | 'lastUpdate' // latestUpdated
    | '-lastUpdate' //firstTheOldOnes
  subcategoryId?: number
  categoryId?: number
  priceGroup?: string
  search?: string
  isNew?: 'True' | 'False'
  gender?: 'men' | 'women'
}
