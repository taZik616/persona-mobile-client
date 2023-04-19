import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'

import {FlatList, SectionList, StyleSheet} from 'react-native'

import {useGender} from 'src/hooks/useGender'
import {vibration} from 'src/services/vibration'
import {useGetBrandsBySexQuery, useGetTopBrandsQuery} from 'src/store/shopApi'
import {IS_IOS} from 'src/variables'

import {TopBrandItem} from './TopBrandItem'

import {AlphabetVerticalSelector} from '../ui/AlphabetVerticalSelector'
import {BrandGroupTitle} from '../ui/BrandGroupTitle'
import {BrandRowItem} from '../ui/BrandRowItem'
import {Header} from '../ui/Header'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {SelectorTwoOptions} from '../ui/SelectorTwoOptions'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'

interface HomeBrandsProps {
  onPressBrand?: (brand: any) => void
}

const emptyArr = ['', '', '', '', '', '']

export const HomeBrands = memo(({onPressBrand}: HomeBrandsProps) => {
  const {isMenSelected, onChangeGender, values} = useGender()

  const allBrands = useGetBrandsBySexQuery(isMenSelected ? 'men' : 'women')

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

  return (
    <>
      <Header title="Бренды" />
      <AlphabetVerticalSelector
        data={allBrands.currentData}
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
        refreshing={allBrands.isFetching && !!allBrands.currentData}
        onRefresh={() => {
          allBrands.refetch()
          topBrandsRef.current.refetch()
        }}
        ListHeaderComponent={() => (
          <TopBrandsHeader
            ref={topBrandsRef}
            onPressBrand={onPressBrand}
            isMenSelected={isMenSelected}
          />
        )}
        renderItem={({item}) => (
          <BrandRowItem
            onPress={onPressBrand}
            isLoading={allBrands.isLoading}
            item={item}
          />
        )}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({section: {title}}) => (
          <BrandGroupTitle title={title} />
        )}
        ListFooterComponent={() => <Spacer height={46} />}
        keyExtractor={_brandKeyExtractor}
        sections={allBrands.currentData ?? []}
        // sections={[{title: 'A',data: [{id: '1',name: 'AGNONA',},],},{title: 'B',data: [{id: '1',name: 'BARRETT',}, {id: '2',name: 'BILLIONAIRE',},{id: '3',name: 'BOGNER',},],},]}
      />
    </>
  )
})

interface TopBrandsHeaderProps {
  isMenSelected: boolean
  onPressBrand?: (brand: any) => void
}

const TopBrandsHeader = memo(
  forwardRef(({isMenSelected, onPressBrand}: TopBrandsHeaderProps, ref) => {
    const topBrands = useGetTopBrandsQuery(isMenSelected)
    const topBrandIsLoading = topBrands.isLoading && topBrands.isFetching

    useImperativeHandle(ref, () => ({
      refetch: () => {
        topBrands.refetch()
      },
    }))

    const renderTopBrand = useCallback(({item}: any) => {
      return <TopBrandItem onPress={onPressBrand} item={item} />
    }, [])

    return (
      <SafeLandscapeView>
        <Spacer height={16} />
        <Text center cg2>
          ТОП-БРЕНДЫ
        </Text>
        <Spacer height={14} />
        <FlatList
          renderItem={renderTopBrand}
          style={styles.topBrandGap}
          columnWrapperStyle={styles.topBrandGap}
          keyExtractor={_brandKeyExtractor}
          numColumns={3}
          data={
            topBrands.currentData?.length && !topBrandIsLoading
              ? topBrands.currentData
              : emptyArr
          }
        />
        <Spacer height={24} />
        <Text center cg2>
          ВСЕ БРЕНДЫ
        </Text>
      </SafeLandscapeView>
    )
  }),
)

const _brandKeyExtractor = (item: any, id: number) => item.id ?? id

const styles = StyleSheet.create({
  topBrandGap: {
    gap: 8,
  },
})
