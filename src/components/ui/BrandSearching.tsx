import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

import {SectionList, StyleSheet, TextInput, View} from 'react-native'

import {useGetAllBrandsQuery} from 'src/store/shopApi'
import {Color} from 'src/themes'

import {BrandGroupTitle} from './BrandGroupTitle'
import {BrandRowItem} from './BrandRowItem'
import {SafeLandscapeView} from './SafeLandscapeView'
import {Spacer} from './Spacer'

import {BottomSheet, BottomSheetRefType} from '../bottom-sheet'

interface BrandSearchingProps {
  onCompleteSelect?: (selected: string[]) => void
}

export interface BrandSearchingRefType {
  open?: () => void
  close?: () => void
}

export const BrandSearching = memo(
  forwardRef<BrandSearchingRefType, BrandSearchingProps>(
    ({onCompleteSelect}, ref) => {
      const [searchText, setSearchText] = useState('')
      const bottomSheetRef = useRef<BottomSheetRefType>(null)
      const allBrands = useGetAllBrandsQuery({})

      useImperativeHandle(ref, () => ({
        open: bottomSheetRef.current?.open,
        close: bottomSheetRef.current?.close,
      }))

      useEffect(() => {
        return () => setSearchText('')
      }, [])

      const onClose = useCallback(() => setSearchText(''), [])

      const content = useMemo(() => {
        const sections = allBrands.currentData
          ?.map(a => {
            return {
              title: a.title,
              data: a.data.filter((b: any) =>
                b.name.toLowerCase().includes(searchText.toLowerCase()),
              ),
            }
          })
          .filter(a => a.data.length > 0)

        return (
          <View>
            <Spacer height={16} />
            <SafeLandscapeView safeArea>
              <TextInput
                value={searchText}
                placeholderTextColor={Color.primaryGray}
                selectionColor={Color.primary}
                blurOnSubmit
                placeholder="Укажите название бренда"
                onChangeText={setSearchText}
                style={styles.search}
              />
            </SafeLandscapeView>
            <Spacer height={16} />
            <SectionList
              scrollEnabled={false}
              removeClippedSubviews
              refreshing={allBrands.isFetching && !!allBrands.currentData}
              onRefresh={() => {
                allBrands.refetch()
              }}
              renderItem={({item}) => (
                <BrandRowItem
                  //onPress={onPressBrand}
                  isLoading={allBrands.isLoading}
                  item={item}
                />
              )}
              showsVerticalScrollIndicator={false}
              renderSectionHeader={({section: {title}}) => (
                <BrandGroupTitle title={title} />
              )}
              keyExtractor={_brandKeyExtractor}
              sections={sections || []}
            />
            <Spacer height={20} />
          </View>
        )
      }, [
        allBrands.currentData,
        searchText,
        allBrands.isLoading,
        onCompleteSelect,
      ])

      return (
        <BottomSheet
          closeDistance={80}
          showClose
          onClose={onClose}
          title="БРЕНДЫ"
          fillMax
          ref={bottomSheetRef}>
          {content}
        </BottomSheet>
      )
    },
  ),
)
const _brandKeyExtractor = (item: any, id: number) => item.id ?? id

const styles = StyleSheet.create({
  search: {
    height: 45,
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: Color.inputBg,
    fontFamily: 'GothamPro',
    fontSize: 13,
    color: Color.primaryBlack,
  },
})
