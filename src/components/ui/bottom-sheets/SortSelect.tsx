import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

import {BottomSheet, BottomSheetRefType} from 'components/bottom-sheet'
import {FlatList, Pressable, StyleSheet, View} from 'react-native'
import {CheckIcon} from 'ui/icons/common'
import {Spacer, Text} from 'ui/index'

import {useHorizontalMargins} from 'src/hooks/useHorizontalMargins'
import {OrderingType} from 'src/store/shopApi'
import {Color} from 'src/themes'
import {OrderingItemI} from 'src/types'

interface SortSelectProps {
  onChangeSort?: (sortValue: OrderingType) => void
  sortingVariants: OrderingItemI[]
}

export interface SortSelectRefType {
  open?: () => void
  close?: () => void
}

export const SortSelect = memo(
  forwardRef<SortSelectRefType, SortSelectProps>(
    ({onChangeSort, sortingVariants}, ref) => {
      const {paddingHorizontal} = useHorizontalMargins({safeArea: true})
      const [selected, setSelected] = useState(sortingVariants[0].value)

      const bottomSheetRef = useRef<BottomSheetRefType>(null)
      useImperativeHandle(ref, () => ({
        open: bottomSheetRef.current?.open,
        close: bottomSheetRef.current?.close,
      }))

      const onPressSortItem = (value: string) => {
        const item = sortingVariants.find(a => a.value === value)
        if (item) {
          setSelected(item.value)
          onChangeSort?.(item?.value)
        }
      }

      const content = useMemo(() => {
        return (
          <FlatList
            data={sortingVariants}
            contentContainerStyle={[styles.listContainer, paddingHorizontal]}
            scrollEnabled={false}
            keyExtractor={it => it.value}
            ItemSeparatorComponent={() => <View style={styles.line} />}
            renderItem={({item}) => (
              <SortSelectItem
                {...item}
                isSelected={selected === item.value}
                onPress={onPressSortItem}
              />
            )}
          />
        )
      }, [sortingVariants, selected, paddingHorizontal, onPressSortItem])

      return (
        <BottomSheet
          title="СОРТИРОВКА"
          showClose
          closeDistance={60}
          ref={bottomSheetRef}>
          {content}
        </BottomSheet>
      )
    },
  ),
)

interface SortSelectItemProps extends OrderingItemI {
  onPress?: (value: OrderingType) => void
  isSelected?: boolean
}

export const SortSelectItem = memo(
  ({onPress, name, isSelected, value}: SortSelectItemProps) => {
    return (
      <Pressable style={styles.itemContainer} onPress={() => onPress?.(value)}>
        <Text style={styles.rowText} numberOfLines={1} gp4>
          {name}
        </Text>
        <Spacer height={8} />
        {isSelected ? <CheckIcon /> : <></>}
      </Pressable>
    )
  },
)

const styles = StyleSheet.create({
  itemContainer: {
    paddingBottom: 8,
    paddingRight: 8,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  rowText: {
    flex: 1,
    flexWrap: 'wrap',
    lineHeight: 22,
  },
  listContainer: {
    paddingTop: 16,
    gap: 16,
    paddingBottom: 22,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Color.border,
  },
})
