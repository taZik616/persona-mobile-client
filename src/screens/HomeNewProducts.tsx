import React from 'react'

import {HomeNewProducts} from 'src/components/HomeNewProducts'

export function HomeNewProductsScreen() {
  return (
    <HomeNewProducts
      onPressProduct={item => console.log('Product pressed:', item)}
    />
  )
}
