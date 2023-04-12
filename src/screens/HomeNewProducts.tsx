import React from 'react'

import {HomeNewProducts} from 'src/components/HomeNewProducts'

export const HomeNewProductsScreen = () => {
  return (
    <HomeNewProducts
      onPressProduct={item => console.log('Product pressed:', item)}
      onPressStarIcon={item => console.log('Star icon pressed:', item)}
    />
  )
}
