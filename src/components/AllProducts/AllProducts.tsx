import React, {memo, useCallback, useEffect, useRef} from 'react'

import {useTypedRoute} from 'src/hooks'
import {useTypedDispatch} from 'src/store'
import {toggleGender} from 'src/store/genderSlice'
import {ProductPreviewInfo} from 'src/types'

import {Header, SelectorTwoOptionsGender, Spacer} from 'ui/index'
import {ProductList, ProductListRef} from 'ui/product-list'
interface AllProductsProps {
  onPressProduct?: (item: ProductPreviewInfo) => void
}

export const AllProducts = memo(({onPressProduct}: AllProductsProps) => {
  const dispatch = useTypedDispatch()
  const listRef = useRef<ProductListRef>(null)
  const {
    genderIgnore,
    showCategoriesFilter,
    showFilter,
    gender,
    ...queryParams
  } = useTypedRoute<'allProducts'>().params || {}

  useEffect(() => {
    if (gender) {
      dispatch(toggleGender(gender))
    }
  }, [gender])

  const onChangeSearch = useCallback((search: string) => {
    listRef.current?.setParams(pr => ({...pr, search}))
  }, [])

  return (
    <>
      <Header showBack onSearchSubmit={onChangeSearch} />
      {!genderIgnore ? (
        <>
          <SelectorTwoOptionsGender />
          <Spacer height={8} />
        </>
      ) : (
        <></>
      )}
      <ProductList
        {...queryParams}
        ref={listRef}
        showCategoriesFilter={showCategoriesFilter ?? true}
        genderIgnore
        showCounter
        onPressProduct={onPressProduct}
        showFilter={showFilter}
      />
    </>
  )
})
