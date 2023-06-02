import React, {memo, useCallback, useEffect, useState} from 'react'

import {APP_API_URL} from '@env'
import {FlashList} from '@shopify/flash-list'
import axios from 'axios'
import {StyleSheet} from 'react-native'
import {SortIcon} from 'ui/icons/common'
import {Spacer} from 'ui/Spacer'

import {useGender} from 'src/hooks/useGender'
import {ProductsParams} from 'src/store/shopApi'

import {FilterItem} from './FilterItem'

interface FilterProps {
  showCategories?: boolean
  sizes: string[]
  onPressSize?: () => void
  onPressSort?: () => void
  onPressBrands?: () => void
  onChangeFilters?: (filters: ProductsParams) => void
}

export const Filter = memo(
  ({
    showCategories,
    onPressSize,
    onPressBrands,
    onPressSort,
    sizes,
  }: FilterProps) => {
    const [filtersFirst, setFiltersFirst] = useState(FILTERS_FIRST_DEFAULT)
    const [filtersSecond, setFiltersSecond] = useState(FILTERS_SECOND_DEFAULT)
    const {isMenSelected} = useGender()

    useEffect(() => {
      setFiltersFirst(pr => {
        if (showCategories) {
          const cats = axios.get(`${APP_API_URL}/api/v1/categories`, {
            params: {
              gender: isMenSelected ? 'men' : 'women',
              level: 2,
            },
          })
          return [cats, ...pr]
        } else {
          return FILTERS_FIRST_DEFAULT
        }
      })
    }, [showCategories, isMenSelected])
    const onSort = useCallback(
      (id: string) => {
        if (id === 'sort') {
          onPressSort?.()
        } else if (id === 'size') {
          onPressSize?.()
        } else if (id === 'brands') {
          onPressBrands?.()
        }
      },
      [onPressSort],
    )

    return (
      <>
        <Spacer height={8} />
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
          data={filtersFirst}
        />
        <Spacer height={10} />
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
          data={filtersSecond}
        />
        <Spacer height={10} />
      </>
    )
  },
)

const FILTERS_FIRST_DEFAULT = [
  {
    id: 'sort',
    icon: <SortIcon />,
  },
  {
    id: 'brands',
    name: 'бренды',
    status: 'passive',
  },
]

const FILTERS_SECOND_DEFAULT = [
  {
    id: 'size',
    name: 'Размер',
  },
]

const styles = StyleSheet.create({
  filtersList: {
    paddingVertical: 6,
  },
})
