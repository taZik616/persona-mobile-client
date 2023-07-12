import React, {useCallback, useRef} from 'react'

import {HomeBrands} from 'src/components/HomeBrands'
import {
  BrandSearching,
  BrandSearchingRefType,
} from 'src/components/ui/bottom-sheets/BrandSearching'
import {useTypedNavigation} from 'src/hooks'

export const HomeBrandsScreen = () => {
  const brandSearchingRef = useRef<BrandSearchingRefType>(null)
  const {navigate} = useTypedNavigation()

  const onSelectBrand = useCallback((brandIds: string) => {
    navigate('allProducts', {brandIds, hideGenderSelect: true})
  }, [])

  const onSelectBrandInSearch = useCallback((brandIds: string) => {
    navigate('allProducts', {
      brandIds,
      hideGenderSelect: true,
      genderIgnore: true,
    })
    brandSearchingRef.current?.close?.()
    brandSearchingRef.current?.cleanSelections()
  }, [])

  const onPressSearch = useCallback(() => {
    brandSearchingRef.current?.open?.()
  }, [])

  return (
    <>
      <HomeBrands onPressSearch={onPressSearch} onPressBrand={onSelectBrand} />
      <BrandSearching
        onCompleteSelect={onSelectBrandInSearch}
        ref={brandSearchingRef}
      />
    </>
  )
}
