import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'

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
type SortsT =
  | 'priceFromLow'
  | 'priceFromTop'
  | 'firstTheOldOnes'
  | 'latestUpdated'

export const HomeNewProducts = memo(
  forwardRef<any, HomeNewProductsProps>(
    ({onPressProduct, onPressSort}, ref) => {
      const {isMenSelected, onChangeGender, values} = useGender()
      const [sort, setSort] = useState<SortsT>('latestUpdated')

      useImperativeHandle(ref, () => ({
        setSort,
      }))

      useScreenBlockCurrent()

      const sorting = useMemo(() => {
        let filterByPrice: 'True' | 'False' = 'False'
        let reverse: 'True' | 'False' = 'False'
        switch (sort) {
          case 'priceFromLow':
            filterByPrice = 'True'
            break
          case 'priceFromTop':
            filterByPrice = 'True'
            reverse = 'True'
            break
          case 'firstTheOldOnes':
            reverse = 'True'
            break
        }

        return {reverse, filterByPrice}
      }, [sort])

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
            reverse={sorting.reverse}
            filterByPrice={sorting.filterByPrice}
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
