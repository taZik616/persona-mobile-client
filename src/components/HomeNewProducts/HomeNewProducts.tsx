import React, {forwardRef, memo, useImperativeHandle, useState} from 'react'

import {useScreenBlockCurrent} from 'src/hooks'
import {useGender} from 'src/hooks/useGender'
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
      const [sort, setSort] = useState<'True' | 'False' | undefined>(undefined)

      useImperativeHandle(ref, () => ({
        setSort,
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
            search={isMenSelected ? 'муж' : 'жен'}
            reverse={sort}
            filterByPrice={sort ? 'True' : 'False'}
            sortBy={`stock`}
            sortedValues={`1`}
            // sortBy="stock new"
            // sortedValues="1;True"
            onPressSort={onPressSort}
            start={0}
            onPressProduct={onPressProduct}
          />
        </>
      )
    },
  ),
)
