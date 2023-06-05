import React from 'react'

import {AllProducts} from 'src/components/AllProducts'
import {useTypedNavigation} from 'src/hooks'
import {ProductPreviewInfo} from 'src/types'

export const AllProductsScreen = () => {
  const {navigate} = useTypedNavigation()

  const onPressProduct = (product: ProductPreviewInfo) => {
    navigate('productDetail', {product, productId: product.productId})
  }

  return <AllProducts onPressProduct={onPressProduct} />
}
