import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'

import {FlashList} from '@shopify/flash-list'
import {StyleSheet} from 'react-native'

import {getProductsCountString} from 'src/helpers'
import {useScreenBlockCurrent} from 'src/hooks'
import {useGender} from 'src/hooks/useGender'
import {Color} from 'src/themes'
import {ProductPreviewInfo, ProductsDataI} from 'src/types'

import {FilterItem} from '../ui/FilterItem'
import {Header} from '../ui/Header'
import {FilterIcon} from '../ui/icons/common'
import {RenderProductList} from '../ui/RenderProductList'
import {SelectorTwoOptions} from '../ui/SelectorTwoOptions'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'

const fakeFilters = [
  {
    id: 'filter',
    icon: <FilterIcon />,
  },
  {
    id: 'brands',
    name: 'бренды',
    status: 'active',
  },
  {
    id: '988',
    name: 'SALVATORE FERRAGAMO',
    status: 'removable',
  },
  {
    id: 'size',
    name: 'Размер',
  },
]

interface HomeNewProductsProps {
  onPressProduct?: (item: ProductPreviewInfo) => void
  onPressSort?: () => void
}

export const HomeNewProducts = memo(
  forwardRef<any, HomeNewProductsProps>(
    ({onPressProduct, onPressSort}, ref) => {
      const {isMenSelected, onChangeGender, values} = useGender()
      const [sort, setSort] = useState('')

      useImperativeHandle(ref, () => ({
        setSort,
      }))

      useScreenBlockCurrent()

      const renderHeader = useCallback(
        (curData: ProductsDataI) => (
          <>
            <Spacer height={8} />
            <Filters onPressSort={onPressSort} />
            <Spacer height={20} />
            {curData?.count && (
              <>
                <Text center color={Color.primaryGray} gp4>
                  {getProductsCountString(curData.count)}
                </Text>
                <Spacer height={18} />
              </>
            )}
          </>
        ),
        [onPressSort],
      )

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
            start={10600}
            onPressProduct={onPressProduct}
            renderHeader={renderHeader}
          />
        </>
      )
    },
  ),
)

interface FiltersProps {
  onPressSort?: () => void
}
const Filters = memo(({onPressSort}: FiltersProps) => {
  const onSort = useCallback(
    (id: string) => {
      if (id === 'filter') {
        onPressSort?.()
      }
    },
    [onPressSort],
  )

  return (
    <FlashList
      horizontal
      bounces={false}
      estimatedItemSize={114}
      showsHorizontalScrollIndicator={false}
      style={styles.filtersList}
      ItemSeparatorComponent={() => <Spacer width={12} />}
      keyExtractor={it => it.id}
      // @ts-ignore
      renderItem={({item}) => <FilterItem onPress={onSort} {...item} />}
      data={fakeFilters}
    />
  )
})

const styles = StyleSheet.create({
  filtersList: {
    paddingVertical: 6,
  },
})
