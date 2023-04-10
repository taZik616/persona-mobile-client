import React from 'react'

import {HomeBrands} from 'src/components/HomeBrands'

export function HomeBrandsScreen() {
  const onPressBrand = (brand: any) => {
    console.log('Brand pressed:', JSON.stringify(brand))
  }
  return <HomeBrands onPressBrand={onPressBrand} />
}
