import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'

import {FlatList, SectionList, StyleSheet} from 'react-native'
import {
  AlphabetVerticalSelector,
  BrandGroupTitle,
  BrandRowItem,
  Header,
  SafeLandscapeView,
  SelectorTwoOptions,
  Spacer,
  Text,
} from 'ui/index'

import {groupByAlphabetical} from 'src/helpers'
import {useGender} from 'src/hooks/useGender'
import {vibration} from 'src/services/vibration'
import {useBrandsQuery} from 'src/store/shopApi'
import {BrandType} from 'src/types'
import {IS_IOS} from 'src/variables'

import {LoadingSkeleton} from './LoadingSkeleton'
import {TopBrandItem} from './TopBrandItem'

interface HomeBrandsProps {
  onPressBrand?: (brandId: string) => void
  onPressSearch?: () => void
}

const emptyArr = Array(6).fill('')

export const HomeBrands = memo(
  ({onPressBrand, onPressSearch}: HomeBrandsProps) => {
    const {isMenSelected, onChangeGender, values} = useGender()

    const allBrands = useBrandsQuery({
      gender: isMenSelected ? 'men' : 'women',
    })

    const listRef = useRef<SectionList>(null)
    const topBrandsRef = useRef<any>(null)

    const handleScrollToLetter = useMemo(() => {
      let prevId: number

      return (id: number) => () => {
        if (prevId !== id) {
          vibration.selection()
          listRef.current?.scrollToLocation({
            animated: false,
            itemIndex: IS_IOS ? 1 : 0,
            sectionIndex: id,
            viewPosition: 0,
          })
        }
        prevId = id
      }
    }, [])

    const sections = useMemo(() => {
      if (!allBrands.currentData) return allBrands.currentData
      return groupByAlphabetical(allBrands.currentData, 'name')
    }, [allBrands.currentData])

    return (
      <>
        <Header title="Бренды" onPressSearch={onPressSearch} />
        <AlphabetVerticalSelector
          data={sections ?? []}
          onChangeLetter={handleScrollToLetter}
        />
        <SelectorTwoOptions
          isSecondActive={isMenSelected}
          onChange={onChangeGender}
          values={values}
        />
        <Spacer height={8} />
        <SectionList
          ref={listRef}
          removeClippedSubviews
          refreshing={allBrands.isFetching && !!sections}
          onRefresh={() => {
            allBrands.refetch()
            topBrandsRef.current.refetch()
          }}
          ListHeaderComponent={
            <TopBrandsHeader
              ref={topBrandsRef}
              onPressBrand={b => onPressBrand?.(b.brandId)}
              isMenSelected={isMenSelected}
            />
          }
          renderItem={({item}) => (
            <BrandRowItem
              onPress={b => onPressBrand?.(b.brandId)}
              isLoading={allBrands.isLoading}
              {...item}
            />
          )}
          ListEmptyComponent={<LoadingSkeleton />}
          showsVerticalScrollIndicator={false}
          renderSectionHeader={({section: {title}}) => (
            <BrandGroupTitle title={title} />
          )}
          ListFooterComponent={<Spacer height={46} />}
          keyExtractor={_brandKeyExtractor}
          sections={sections ?? []}
        />
      </>
    )
  },
)

interface TopBrandsHeaderProps {
  isMenSelected: boolean
  onPressBrand?: (brand: BrandType) => void
}

const TopBrandsHeader = memo(
  forwardRef(({isMenSelected, onPressBrand}: TopBrandsHeaderProps, ref) => {
    const topBrands = useBrandsQuery({
      gender: isMenSelected ? 'men' : 'women',
      isTop: 'True',
    })
    const topBrandIsLoading = topBrands.isLoading && topBrands.isFetching

    useImperativeHandle(ref, () => ({
      refetch: () => {
        topBrands.refetch()
      },
    }))

    const isLoading = !topBrands.currentData?.length || topBrandIsLoading
    return (
      <SafeLandscapeView>
        <Spacer height={16} />
        <Text center cg2>
          ТОП-БРЕНДЫ
        </Text>
        <Spacer height={14} />
        <FlatList
          renderItem={({item}: any) => {
            return (
              <TopBrandItem
                onPress={onPressBrand}
                isLoading={isLoading}
                {...item}
              />
            )
          }}
          style={styles.topBrandGap}
          columnWrapperStyle={styles.topBrandGap}
          keyExtractor={_brandKeyExtractor}
          numColumns={3}
          data={isLoading ? emptyArr : topBrands.currentData}
        />
        <Spacer height={24} />
        <Text center cg2>
          ВСЕ БРЕНДЫ
        </Text>
      </SafeLandscapeView>
    )
  }),
)

const _brandKeyExtractor = (item: BrandType, id: number) => item?.brandId ?? id

const styles = StyleSheet.create({
  topBrandGap: {
    gap: 8,
  },
})
