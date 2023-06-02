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

import {BottomSheet, BottomSheetRefType} from 'components/bottom-sheet'
import {SectionList, StyleSheet, TextInput, View} from 'react-native'
import {SafeLandscapeView, Spacer, Text} from 'ui/index'
import {BrandGroupTitle, BrandRowItem} from 'ui/index'

import {groupByAlphabetical} from 'src/helpers'
import {useBrandsQuery} from 'src/store/shopApi'
import {Color} from 'src/themes'
import {BrandType} from 'src/types'

interface BrandSearchingProps {
  onCompleteSelect?: (brand: any) => void
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
      const {
        currentData: temp,
        isFetching,
        isLoading,
        refetch,
      } = useBrandsQuery({})
      const brand = temp as BrandType[] | undefined

      useImperativeHandle(ref, () => ({
        open: bottomSheetRef.current?.open,
        close: bottomSheetRef.current?.close,
      }))

      useEffect(() => {
        return () => setSearchText('')
      }, [])

      const onClose = useCallback(() => setSearchText(''), [])

      const content = useMemo(() => {
        const sections = groupByAlphabetical(brand ?? [], 'name')
          .map(a => {
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
                autoFocus
                placeholder="Укажите название бренда"
                onChangeText={setSearchText}
                style={styles.search}
              />
            </SafeLandscapeView>
            <Spacer height={16} />
            <SectionList
              ListEmptyComponent={
                <SafeLandscapeView safeArea>
                  <Spacer height={32} />
                  <Text gp4 center>
                    По введенному запросу ничего не найдено.
                  </Text>
                </SafeLandscapeView>
              }
              scrollEnabled={false}
              removeClippedSubviews
              refreshing={isFetching && !!brand}
              onRefresh={() => {
                refetch()
              }}
              renderItem={({item}) => (
                <BrandRowItem
                  onPress={onCompleteSelect}
                  isLoading={isLoading}
                  brand={item}
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
      }, [brand, searchText, isLoading, onCompleteSelect])

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
const _brandKeyExtractor = (item: BrandType, id: number) => item?.brandId ?? id

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
