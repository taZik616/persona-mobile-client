import React, {useCallback, useRef} from 'react'

import {HomeNewProducts} from 'src/components/HomeNewProducts'
import {useTypedNavigation} from 'src/hooks'
import {ProductPreviewInfo} from 'src/types'

export const HomeNewProductsScreen = () => {
  const {navigate} = useTypedNavigation()
  const componentRef = useRef<any>(null)
  // Пока тут нету никаких хуков, вызывающих ре-рендер, можно обходится без useCallback
  const onPressProduct = useCallback((item: ProductPreviewInfo) => {
    navigate('productDetail', {product: item, productId: item.productId})
  }, [])

  // const onClearSort = useCallback(() => {
  //   componentRef.current?.setSort(undefined)
  // }, [])

  return <HomeNewProducts ref={componentRef} onPressProduct={onPressProduct} />
}
