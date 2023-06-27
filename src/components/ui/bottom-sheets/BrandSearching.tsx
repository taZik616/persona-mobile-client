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

import {groupByAlphabetical} from 'src/helpers'
import {vibration} from 'src/services/vibration'
import {useBrandsQuery} from 'src/store/shopApi'
import {Color} from 'src/themes'
import {BrandType} from 'src/types'

import {BrandGroupTitle, BrandRowItem} from 'ui/index'
import {Button, SafeLandscapeView, Spacer, Text} from 'ui/index'

interface BrandSearchingProps {
  onCompleteSelect?: (brandIds: string, brands: BrandType[]) => void
  gender?: 'men' | 'women' | 'both'
}

export interface BrandSearchingRefType {
  open?: () => void
  close?: () => void
  cleanSelections: () => void
}

export const BrandSearching = memo(
  forwardRef<BrandSearchingRefType, BrandSearchingProps>(
    ({onCompleteSelect, gender = 'both'}, ref) => {
      const bottomSheetRef = useRef<BottomSheetRefType>(null)
      const submitButtonRef = useRef<SubmitButtonRefType>(null)
      const contentRef = useRef<BottomSheetContentRefType>(null)

      useImperativeHandle(ref, () => ({
        open: bottomSheetRef.current?.open,
        close: bottomSheetRef.current?.close,
        cleanSelections: () => {
          submitButtonRef.current?.setSelectedIds([])
          contentRef.current?.setSelectedIds([])
        },
      }))

      const onChangeSelect = useCallback((ids: string[]) => {
        submitButtonRef.current?.setSelectedIds(ids)
      }, [])

      const onClose = useCallback(
        () => contentRef.current?.setSearchText(''),
        [],
      )

      return (
        <BottomSheet
          closeDistance={80}
          showClose
          onClose={onClose}
          title="БРЕНДЫ"
          fillMax
          stickyComponent={
            <SubmitButton
              ref={submitButtonRef}
              onCompleteSelect={onCompleteSelect}
            />
          }
          ref={bottomSheetRef}>
          <BottomSheetContent
            onChangeSelect={onChangeSelect}
            ref={contentRef}
            gender={gender}
          />
        </BottomSheet>
      )
    },
  ),
)
const _brandKeyExtractor = (item: BrandType, id: number) => item?.brandId ?? id

interface SubmitButtonRefType {
  setSelectedIds: (ids: string[]) => void
}

interface SubmitButtonProps {
  onCompleteSelect?: (brandIds: string, brands: BrandType[]) => void
}

const SubmitButton = memo(
  forwardRef<SubmitButtonRefType, SubmitButtonProps>(
    ({onCompleteSelect}, ref) => {
      const [selectedIds, setSelectedIds] = useState<string[]>([])
      const {currentData: temp} = useBrandsQuery({})
      const brands = temp as BrandType[] | undefined

      const onSubmit = () => {
        if (brands)
          onCompleteSelect?.(
            selectedIds.join(','),
            selectedIds
              .map(a => brands.find(b => b.brandId === a))
              .filter(Boolean) as BrandType[],
          )
      }

      useImperativeHandle(ref, () => ({
        setSelectedIds,
      }))

      return (
        <SafeLandscapeView safeArea style={styles.button}>
          <Button disabled={!selectedIds.length} onPress={onSubmit}>
            Показать
          </Button>
        </SafeLandscapeView>
      )
    },
  ),
)

interface BottomSheetContentRefType {
  setSearchText: (text: string) => void
  setSelectedIds: (ids: string[]) => void
}

interface BottomSheetContentProps {
  onChangeSelect: (ids: string[]) => void
  gender: 'men' | 'women' | 'both'
}

const BottomSheetContent = memo(
  forwardRef<BottomSheetContentRefType, BottomSheetContentProps>(
    ({onChangeSelect, gender}, ref) => {
      const [selectedIds, setSelectedIds] = useState<string[]>([])
      const [searchText, setSearchText] = useState('')

      const {
        currentData: temp,
        isFetching,
        refetch,
      } = useBrandsQuery({
        gender: gender === 'both' ? undefined : gender,
      })

      useEffect(() => {
        return () => setSearchText('')
      }, [])

      useImperativeHandle(ref, () => ({
        setSearchText,
        setSelectedIds,
      }))

      const brands = temp as BrandType[] | undefined

      const sections = useMemo(() => {
        return groupByAlphabetical(brands ?? [], 'name')
          .map(a => {
            return {
              title: a.title,
              data: a.data.filter((b: any) =>
                b.name.toLowerCase().includes(searchText.toLowerCase()),
              ),
            }
          })
          .filter(a => a.data.length > 0)
      }, [brands, searchText])

      const onPressItem = useCallback(({brandId}: BrandType) => {
        vibration.selection()
        setSelectedIds(pr => {
          if (pr.includes(brandId)) {
            const newState = pr.filter(a => a !== brandId)
            onChangeSelect(newState)
            return newState
          }
          const newState = [...pr, brandId]
          onChangeSelect(newState)
          return newState
        })
      }, [])

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
            refreshing={isFetching && !!brands}
            onRefresh={() => {
              refetch()
            }}
            renderItem={({item}) => (
              <BrandRowItem
                isSelected={selectedIds.includes(item.brandId)}
                onPress={onPressItem}
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
    },
  ),
)

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
