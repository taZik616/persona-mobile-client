import React, {forwardRef, memo, useImperativeHandle, useState} from 'react'

import {Header, SelectorTwoOptions, Spacer} from 'ui/index'
import {ProductList} from 'ui/product-list'

import {useScreenBlockCurrent} from 'src/hooks'
import {useGender} from 'src/hooks/useGender'
import {ProductsParams} from 'src/store/shopApi'
import {ProductPreviewInfo} from 'src/types'

interface HomeNewProductsProps {
  onPressProduct?: (item: ProductPreviewInfo) => void
}

export const HomeNewProducts = memo(
  forwardRef<any, HomeNewProductsProps>(({onPressProduct}, ref) => {
    const {isMenSelected, onChangeGender, values} = useGender()
    const [ordering, setOrdering] =
      useState<ProductsParams['ordering']>('-lastUpdate')

    useImperativeHandle(ref, () => ({
      setOrdering,
    }))

    useScreenBlockCurrent()

    return (
      <>
        <Header title="Новые поступления" />
        <SelectorTwoOptions
          isSecondActive={isMenSelected}
          onChange={onChangeGender}
          values={values}
        />
        <Spacer height={8} />
        <ProductList
          showFilter
          showCounter
          showCategoriesFilter
          ordering={ordering}
          isNew="True"
          onPressProduct={onPressProduct}
        />
      </>
    )
  }),
)
