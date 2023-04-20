import React from 'react'

import {Basket} from 'src/components/Basket'
import {useTypedNavigation} from 'src/hooks'
import {ProductPreviewInfo} from 'src/types'

export const BasketScreen = () => {
  const {goBack, navigate} = useTypedNavigation()
  // const dispatch = useTypedDispatch()

  const onPressBasketItem = (item: ProductPreviewInfo) => {
    navigate('productDetail', item)
  }

  const onChangeSelect = (item: ProductPreviewInfo, isSelected: boolean) => {
    console.log('🚀 - onChangeSelect:', item.productId, '-', isSelected)
  }

  return (
    <Basket
      onChangeSelect={onChangeSelect}
      onPressBasketItem={onPressBasketItem}
      onPressBack={goBack}
    />
  )
}
