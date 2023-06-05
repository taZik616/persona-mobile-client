import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'

import {APP_API_URL} from '@env'
import {FlashList} from '@shopify/flash-list'
import axios from 'axios'
import {StyleSheet} from 'react-native'

import {useGender} from 'src/hooks/useGender'
import {useHorizontalMargins} from 'src/hooks/useHorizontalMargins'
import {BrandType} from 'src/types'

import {SortIcon} from 'ui/icons/common'
import {Spacer} from 'ui/Spacer'

import {FilterItem} from './FilterItem'

interface FilterProps {
  showCategories?: boolean
  onPressSize?: () => void
  onPressSort?: () => void
  onPressBrands?: () => void
  onChangeCategory?: (categoryId?: number) => void
  onRemoveBrand?: (brandId: string) => void
  onRemoveSize?: (size: string) => void
}

export interface FilterRefType {
  setBrandFilters: (brands: BrandType[]) => void
  setSizesFilters: (sizes: string[]) => void
}

/**
 * @param showCategories - должен быть статичным
 */
export const Filter = memo(
  forwardRef<FilterRefType, FilterProps>(
    (
      {
        showCategories,
        onPressSize,
        onPressBrands,
        onPressSort,
        onRemoveBrand,
        onChangeCategory,
        onRemoveSize,
      },
      ref,
    ) => {
      const [filtersFirst, setFiltersFirst] = useState<FilterItemType[]>(
        FILTERS_FIRST_DEFAULT,
      )
      const {paddingHorizontal} = useHorizontalMargins()
      const [filtersSecond, setFiltersSecond] = useState<FilterItemType[]>(
        FILTERS_SECOND_DEFAULT,
      )
      const {isMenSelected} = useGender()

      useImperativeHandle(ref, () => ({
        setBrandFilters: brands => {
          const brandFilters: any[] = brands.map(b => ({
            id: `brand-${b.brandId}`,
            name: b.name,
            status: 'removable',
            isBrand: true,
          }))
          const brandsStatus = brandFilters.length ? 'active' : 'passive'
          setFiltersFirst(pr => [
            ...pr
              .filter(a => !a.isBrand)
              .map(a => (a.id === 'brands' ? {...a, status: brandsStatus} : a)),
            ...brandFilters,
          ])
        },
        setSizesFilters: sizes => {
          const sizeFilters: any[] = sizes.map(a => ({
            id: `size-${a}`,
            name: a,
            status: 'removable',
            isSize: true,
          }))
          setFiltersSecond(pr => [...pr.filter(a => !a.isSize), ...sizeFilters])
        },
      }))

      useEffect(() => {
        const filtersWithCategories = async () => {
          const cats = await axios.get(`${APP_API_URL}/api/v1/categories`, {
            params: {
              gender: isMenSelected ? 'men' : 'women',
              level: 1,
            },
          })
          const catsFilters = cats.data.map((c: any) => ({
            id: `category-${c.categoryId}`,
            name: c.name,
            status: 'passive',
            isCat: true,
          }))
          setFiltersFirst(pr => [...pr.filter(a => !a.isCat), ...catsFilters])
        }
        if (showCategories) {
          filtersWithCategories()
        }
      }, [isMenSelected])

      const onPressFilter = useCallback(
        (id: string) => {
          if (id === 'sort') {
            onPressSort?.()
          } else if (id === 'size') {
            onPressSize?.()
          } else if (id === 'brands') {
            onPressBrands?.()
          } else if (id.startsWith('category-')) {
            const categoryId = id.split('category-')[1]
            let isRemoved: boolean = false
            setFiltersFirst(pr => {
              const current: FilterItemType[] = pr.map(a => {
                if (a.id === id) {
                  isRemoved = a.status === 'active'
                  return {
                    ...a,
                    status: a.status === 'active' ? 'passive' : 'active',
                  }
                }
                return {
                  ...a,
                  status: a.id.startsWith('category-') ? 'passive' : a.status,
                }
              })
              onChangeCategory?.(isRemoved ? undefined : Number(categoryId))
              return current
            })
          }
        },
        [onPressSort, onPressSize, onPressBrands, onChangeCategory],
      )

      const onRemoveFilter = useCallback(
        (id: string) => {
          if (id.startsWith('brand-')) {
            onRemoveBrand?.(id.split('brand-')[1])
            setFiltersFirst(pr => {
              const filtered = pr.filter(a => a.id !== id)
              const brandsStatus = filtered.some(a => a.isBrand)
                ? 'active'
                : 'passive'
              return filtered.map(a =>
                a.id === 'brands' ? {...a, status: brandsStatus} : a,
              )
            })
          } else if (id.startsWith('size-')) {
            onRemoveSize?.(id.split('size-')[1])
            setFiltersSecond(pr => pr.filter(a => a.id !== id))
          }
        },
        [onRemoveBrand, onRemoveSize],
      )

      return (
        <>
          <Spacer height={8} />
          <FlashList
            horizontal
            contentContainerStyle={paddingHorizontal}
            bounces={false}
            estimatedItemSize={114}
            showsHorizontalScrollIndicator={false}
            style={styles.filtersList}
            ItemSeparatorComponent={() => <Spacer width={12} />}
            keyExtractor={it => it.id}
            renderItem={({item}) => (
              <FilterItem
                onPress={onPressFilter}
                onRemove={onRemoveFilter}
                {...item}
              />
            )}
            data={filtersFirst}
          />
          <Spacer height={10} />
          <FlashList
            horizontal
            contentContainerStyle={paddingHorizontal}
            bounces={false}
            estimatedItemSize={114}
            showsHorizontalScrollIndicator={false}
            style={styles.filtersList}
            ItemSeparatorComponent={() => <Spacer width={12} />}
            keyExtractor={it => it.id}
            renderItem={({item}) => (
              <FilterItem
                onPress={onPressFilter}
                onRemove={onRemoveFilter}
                {...item}
              />
            )}
            data={filtersSecond}
          />
          <Spacer height={10} />
        </>
      )
    },
  ),
)

type FilterItemType = {
  id: string
  icon?: JSX.Element
  name?: string
  status?: 'active' | 'passive' | 'removable'
  isCat?: boolean
  isBrand?: boolean
  isSize?: boolean
}

const FILTERS_FIRST_DEFAULT: FilterItemType[] = [
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

const FILTERS_SECOND_DEFAULT: FilterItemType[] = [
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
