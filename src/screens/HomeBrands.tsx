import React, {useCallback} from 'react'

import {HomeBrands} from 'src/components/HomeBrands'

export const HomeBrandsScreen = () => {
  const onPressBrand = useCallback((brand: any) => {
    console.log('Brand pressed:', JSON.stringify(brand))
  }, [])
  return <HomeBrands onPressBrand={onPressBrand} />
}
