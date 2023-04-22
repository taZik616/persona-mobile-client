import React, {useCallback, useRef} from 'react'

import {HomeBrands} from 'src/components/HomeBrands'
import {
  BrandSearching,
  BrandSearchingRefType,
} from 'src/components/ui/BrandSearching'

export const HomeBrandsScreen = () => {
  const brandSearchingRef = useRef<BrandSearchingRefType>(null)

  const onPressBrand = useCallback((brand: any) => {
    console.log('Brand pressed:', JSON.stringify(brand))
  }, [])

  const onPressSearch = useCallback(() => {
    brandSearchingRef.current?.open?.()
  }, [])

  return (
    <>
      <HomeBrands onPressSearch={onPressSearch} onPressBrand={onPressBrand} />
      <BrandSearching ref={brandSearchingRef} />
    </>
  )
}
