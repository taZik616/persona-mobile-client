import React, {useCallback, useRef} from 'react'

import {BrandSearching, BrandSearchingRefType} from 'ui/BrandSearching'

import {HomeBrands} from 'src/components/HomeBrands'

export const HomeBrandsScreen = () => {
  const brandSearchingRef = useRef<BrandSearchingRefType>(null)

  const onPressBrand = useCallback((brand: any) => {
    console.log('Brand pressed:', JSON.stringify(brand))
    brandSearchingRef.current?.close?.()
  }, [])

  const onPressSearch = useCallback(() => {
    brandSearchingRef.current?.open?.()
  }, [])

  return (
    <>
      <HomeBrands onPressSearch={onPressSearch} onPressBrand={onPressBrand} />
      <BrandSearching onCompleteSelect={onPressBrand} ref={brandSearchingRef} />
    </>
  )
}
