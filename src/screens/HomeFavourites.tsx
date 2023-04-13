import React from 'react'

import {HomeFavourites} from 'src/components/HomeFavourites'
import {useTypedNavigation} from 'src/hooks'
import {ProductPreviewInfo} from 'src/types'

export const HomeFavouritesScreen = () => {
  const {navigate} = useTypedNavigation()
  // Пока тут нету никаких хуков, вызывающих ре-рендер, можно обходться без useCallback
  const onPressProduct = (item: ProductPreviewInfo) => {
    navigate('productDetail', item)
  }

  return <HomeFavourites onPressProduct={onPressProduct} />
}
