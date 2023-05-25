import React, {useCallback, useRef} from 'react'

import {HomeNewProducts} from 'src/components/HomeNewProducts'
import {SortSelect, SortSelectRefType} from 'src/components/ui/SortSelect'
import {useTypedNavigation} from 'src/hooks'
import {OrderingItemI, ProductPreviewInfo} from 'src/types'

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
    componentRef.current?.setSort(id)
  }, [])

  // const onClearSort = useCallback(() => {
  //   componentRef.current?.setSort(undefined)
  // }, [])

  return (
    <>
      <HomeNewProducts
        ref={componentRef}
        onPressSort={onPressSort}
        onPressProduct={onPressProduct}
      />
      <SortSelect
        defaultSortId="latestUpdated"
        ref={sortSelectRef}
        onChangeSort={onChangeSort}
        options={sortOptions}
      />
    </>
  )
}

const sortOptions: OrderingItemI[] = [
  {
    name: 'Сначала обновления',
    id: '-lastUpdate',
  },
  {
    name: 'Сначала старые',
    id: 'lastUpdate',
  },
  {
    name: 'По возрастанию цены',
    id: 'price',
  },
  {
    name: 'По убыванию цены',
    id: '-price',
  },
]
