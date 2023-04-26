import React, {useCallback, useRef} from 'react'

import {HomeNewProducts} from 'src/components/HomeNewProducts'
import {SortSelect, SortSelectRefType} from 'src/components/ui/SortSelect'
import {useTypedNavigation} from 'src/hooks'
import {ProductPreviewInfo, SortItemI} from 'src/types'

export const HomeNewProductsScreen = () => {
  const {navigate} = useTypedNavigation()
  const componentRef = useRef<any>(null)
  const sortSelectRef = useRef<SortSelectRefType>(null)
  // Пока тут нету никаких хуков, вызывающих ре-рендер, можно обходится без useCallback
  const onPressProduct = useCallback((item: ProductPreviewInfo) => {
    navigate('productDetail', {item, productId: item.productId})
  }, [])

  const onPressSort = useCallback(() => {
    sortSelectRef.current?.open?.()
  }, [])

  const onChangeSort = useCallback((id: string) => {
    console.log('onChangeSort:', id)
    componentRef.current?.setSort(id)
  }, [])

  return (
    <>
      <HomeNewProducts
        ref={componentRef}
        onPressSort={onPressSort}
        onPressProduct={onPressProduct}
      />
      <SortSelect
        ref={sortSelectRef}
        onChangeSort={onChangeSort}
        options={sortOptions}
      />
    </>
  )
}

const sortOptions: SortItemI[] = [
  {
    name: 'Новые поступления',
    id: 'new',
  },
  {
    name: 'По возрастанию цены',
    id: 'priceFromLow',
  },
  {
    name: 'Новые поступления',
    id: 'priceFromTop',
  },
]
