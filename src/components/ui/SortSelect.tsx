import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

import {FlatList, Pressable, StyleSheet, View} from 'react-native'

import {useHorizontalMargins} from 'src/hooks/useHorizontalMargins'
import {Color} from 'src/themes'
import {SortItemI} from 'src/types'

import {CheckIcon} from './icons/common'
import {Spacer} from './Spacer'
import {Text} from './Text'

import {BottomSheet, BottomSheetRefType} from '../bottom-sheet'

interface SortSelectProps {
  onChangeSort?: (id: string) => void
  defaultSortId?: string
  options: SortItemI[]
}

export interface SortSelectRefType {
  open?: () => void
  close?: () => void
}

export const SortSelect = memo(
  forwardRef<SortSelectRefType, SortSelectProps>(
    ({onChangeSort, defaultSortId = '', options}, ref) => {
      const {paddingHorizontal} = useHorizontalMargins({safeArea: true})
      const [selected, setSelected] = useState(defaultSortId)

      const bottomSheetRef = useRef<BottomSheetRefType>(null)
      useImperativeHandle(ref, () => ({
        open: bottomSheetRef.current?.open,
        close: bottomSheetRef.current?.close,
      }))

      const onPressSortItem = (id: string) => {
        setSelected(id)
        onChangeSort?.(id)
      }

      const content = useMemo(() => {
        return (
          <FlatList
            data={options}
            contentContainerStyle={[styles.listContainer, paddingHorizontal]}
            scrollEnabled={false}
            keyExtractor={it => it.id}
            ItemSeparatorComponent={() => <View style={styles.line} />}
            renderItem={({item}) => (
              <SortSelectItem
                {...item}
                isSelected={selected === item.id}
                onPress={onPressSortItem}
              />
            )}
          />
        )
      }, [options, selected, paddingHorizontal, onPressSortItem])

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

interface SortSelectItemProps {
  name: string
  id: string
  onPress?: (id: string) => void
  isSelected?: boolean
}

export const SortSelectItem = memo(
  ({onPress, name, isSelected, id}: SortSelectItemProps) => {
    return (
      <Pressable style={styles.itemContainer} onPress={() => onPress?.(id)}>
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
