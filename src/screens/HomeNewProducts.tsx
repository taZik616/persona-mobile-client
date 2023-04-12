import React from 'react'

import {HomeNewProducts} from 'src/components/HomeNewProducts'
import {useTypedNavigation} from 'src/hooks'
import {ProductPreviewInfo} from 'src/types'

export const HomeNewProductsScreen = () => {
  const {navigate} = useTypedNavigation()
  // Пока тут нету никаких хуков, вызывающих ре-рендер, можно обходться без useCallback
  const onPressProduct = (item: ProductPreviewInfo) => {
    navigate('productDetail', item)
  }

  return (
    <HomeNewProducts
      onPressProduct={onPressProduct}
      onPressStarIcon={item => console.log('Star icon pressed:', item)}
    />
  )
}
