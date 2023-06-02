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
import {Button, SafeLandscapeView, Spacer, Text} from 'ui/index'
import {BrandGroupTitle, BrandRowItem} from 'ui/index'

import {groupByAlphabetical} from 'src/helpers'
import {vibration} from 'src/services/vibration'
import {useBrandsQuery} from 'src/store/shopApi'
import {Color} from 'src/themes'
import {BrandType} from 'src/types'

interface BrandSearchingProps {
  onCompleteSelect?: (brandIds: string, brands: BrandType[]) => void
}

export interface BrandSearchingRefType {
  open?: () => void
  close?: () => void
  cleanSelections: () => void
}

export const BrandSearching = memo(
  forwardRef<BrandSearchingRefType, BrandSearchingProps>(
    ({onCompleteSelect}, ref) => {
      const [searchText, setSearchText] = useState('')
      const [selectedIds, setSelectedIds] = useState<string[]>([])
      const bottomSheetRef = useRef<BottomSheetRefType>(null)
      const {
        currentData: temp,
        isFetching,
        isLoading,
        refetch,
      } = useBrandsQuery({})
      const brands = temp as BrandType[] | undefined

      useImperativeHandle(ref, () => ({
        open: bottomSheetRef.current?.open,
        close: bottomSheetRef.current?.close,
        cleanSelections: () => setSelectedIds([]),
      }))

      useEffect(() => {
        return () => setSearchText('')
      }, [])

      const onClose = useCallback(() => setSearchText(''), [])

      const content = useMemo(() => {
        const sections = groupByAlphabetical(brands ?? [], 'name')
          .map(a => {
            return {
              title: a.title,
              data: a.data.filter((b: any) =>
                b.name.toLowerCase().includes(searchText.toLowerCase()),
              ),
            }
          })
          .filter(a => a.data.length > 0)
        const onPressItem = ({brandId}: BrandType) => {
          vibration.selection()
          setSelectedIds(pr => {
            if (pr.includes(brandId)) return pr.filter(a => a !== brandId)
            return [...pr, brandId]
          })
        }

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
              refreshing={isFetching && !!brands}
              onRefresh={() => {
                refetch()
              }}
              renderItem={({item}) => (
                <BrandRowItem
                  isSelected={selectedIds.includes(item.brandId)}
                  onPress={onPressItem}
                  isLoading={isLoading}
                  {...item}
                />
              )}
              showsVerticalScrollIndicator={false}
              renderSectionHeader={({section: {title}}) => (
                <BrandGroupTitle title={title} />
              )}
              keyExtractor={_brandKeyExtractor}
              sections={sections || []}
            />
            <Spacer height={100} />
          </View>
        )
      }, [brands, selectedIds, searchText, isLoading])

      const button = useMemo(() => {
        const onSubmit = () => {
          if (brands)
            onCompleteSelect?.(
              selectedIds.join(','),
              selectedIds
                .map(a => brands.find(b => b.brandId === a))
                .filter(Boolean) as BrandType[],
            )
        }

        return (
          <SafeLandscapeView safeArea style={styles.button}>
            <Button disabled={!selectedIds.length} onPress={onSubmit}>
              Показать
            </Button>
          </SafeLandscapeView>
        )
      }, [brands, selectedIds, onCompleteSelect])

      return (
        <BottomSheet
          closeDistance={80}
          showClose
          onClose={onClose}
          title="БРЕНДЫ"
          fillMax
          stickyComponent={button}
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
  button: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },
})
