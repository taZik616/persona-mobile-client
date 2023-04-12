import React from 'react'

import {HomeNewProducts} from 'src/components/HomeNewProducts'

export const HomeNewProductsScreen = () => {
  return (
    <HomeNewProducts
      onPressProduct={item => console.log('Product pressed:', item)}
      onPressAddToBasket={item => console.log('Add product to basket:', item)}
      onPressTopRightIcon={item => console.log('Top right icon pressed:', item)}
    />
  )
}
