import React from 'react'

import {HomeNewProducts} from 'src/components/HomeNewProducts'
import {useTypedNavigation} from 'src/hooks'
import {ProductPreviewInfo} from 'src/types'

export const HomeNewProductsScreen = () => {
  const {navigate} = useTypedNavigation()

  const onPressProduct = (item: ProductPreviewInfo) => {
    navigate('productDetail', {product: item, productId: item.productId})
  }

  return <HomeNewProducts onPressProduct={onPressProduct} />
}
