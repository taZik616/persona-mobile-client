import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

import {BottomSheet, BottomSheetRefType} from 'components/bottom-sheet'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import {vibration} from 'src/services/vibration'
import {OrderingType} from 'src/store/shopApi'
import {Color} from 'src/themes'
import {OrderingItemI} from 'src/types'

import {CheckIcon} from 'ui/icons/common'
import {Button, SafeLandscapeView, Spacer, Text} from 'ui/index'

interface SizeSelectProps {
  onChangeSizes?: (sizes: string) => void
  sizes: string[]
}

export interface SizeSelectRefType {
  open?: () => void
  close?: () => void
  cleanSelections: () => void
}

export const SizeSelect = memo(
  forwardRef<SizeSelectRefType, SizeSelectProps>(
    ({onChangeSizes, sizes}, ref) => {
      const [selected, setSelected] = useState<string[]>([])

      const bottomSheetRef = useRef<BottomSheetRefType>(null)
      useImperativeHandle(ref, () => ({
        open: bottomSheetRef.current?.open,
        close: bottomSheetRef.current?.close,
        cleanSelections: () => setSelected([]),
      }))

      const content = useMemo(() => {
        const onSubmitSizes = () => {
          onChangeSizes?.(selected.join(','))
        }

        const onSelectSizes = (size: string) => {
          setSelected(pr => {
            if (!pr.includes(size)) {
              return [...pr, size]
            } else {
              return pr.filter(a => a !== size)
            }
          })
        }
        return (
          <SafeLandscapeView>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scrollContainer}>
              <Spacer height={16} />
              {!sizes.length ? (
                <>
                  <Spacer height={8} />
                  <Text color={Color.primaryGray} center gp4>
                    Варианты размера отсутствуют
                  </Text>
                  <Spacer height={16} />
                </>
              ) : (
                <></>
              )}
              <View style={styles.listContainer}>
                {sizes.map(item => {
                  const isSelected = selected.includes(item)
                  const onPress = () => {
                    vibration.selection()
                    onSelectSizes(item)
                  }
                  return (
                    <TouchableOpacity
                      key={item}
                      style={styles.rectContainer}
                      onPress={onPress}>
                      {isSelected ? (
                        <View style={styles.selectionBorders} />
                      ) : (
                        <></>
                      )}
                      <View style={[styles.rect]}>
                        <Text gp5>{item}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </ScrollView>
            <Spacer height={16} />
            <Button disabled={selected.length === 0} onPress={onSubmitSizes}>
              Выбрать
            </Button>
            <Spacer height={24} withBottomInsets />
          </SafeLandscapeView>
        )
      }, [sizes, selected])

      return (
        <BottomSheet
          title="ДОСТУПНЫЕ РАЗМЕРЫ"
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
  selectionBorders: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: Color.primary,
  },
  rectContainer: {
    height: 36,
    minWidth: 36,
    marginHorizontal: 4,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rect: {
    height: 32,
    minWidth: 32,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {maxHeight: 300},
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
})
