import React, {forwardRef, memo, useImperativeHandle, useState} from 'react'

import {useScreenBlockCurrent} from 'src/hooks'
import {useGender} from 'src/hooks/useGender'
import {ProductsParams} from 'src/store/shopApi'
import {ProductPreviewInfo} from 'src/types'

import {Header} from '../ui/Header'
import {RenderProductList} from '../ui/RenderProductList'
import {SelectorTwoOptions} from '../ui/SelectorTwoOptions'
import {Spacer} from '../ui/Spacer'

interface HomeNewProductsProps {
  onPressProduct?: (item: ProductPreviewInfo) => void
  onPressSort?: () => void
}

export const HomeNewProducts = memo(
  forwardRef<any, HomeNewProductsProps>(
    ({onPressProduct, onPressSort}, ref) => {
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
          <RenderProductList
            showFilter
            showCounter
            gender={isMenSelected ? 'men' : 'women'}
            ordering={ordering}
            isNew="True"
            onPressSort={onPressSort}
            onPressProduct={onPressProduct}
          />
        </>
      )
    },
  ),
)
