import React from 'react'

import {HomeCatalogProducts} from 'src/components/HomeCatalogProducts'
import {useTypedNavigation} from 'src/hooks'
import {ProductPreviewInfo} from 'src/types'

export const HomeCatalogProductsScreen = () => {
  const {navigate} = useTypedNavigation()
  const onPressProduct = (item: ProductPreviewInfo) => {
    navigate('productDetail', {item, productId: item.productId})
  }
  return <HomeCatalogProducts onPressProduct={onPressProduct} />
}
