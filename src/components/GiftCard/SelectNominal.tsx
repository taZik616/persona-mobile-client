import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

import {BottomSheet, BottomSheetRefType} from 'components/bottom-sheet'
import {StyleSheet, TouchableOpacity, View} from 'react-native'

import {cleanNumber} from 'src/helpers'
import {Color} from 'src/themes'

import {CheckIcon, CircleCheckmarkIcon} from 'ui/icons/common'
import {Button, SafeLandscapeView, Spacer, Text} from 'ui/index'

interface SelectNominalProps {
  onSubmit?: (count: number, cost: number) => void
}

export interface SelectNominalRefType {
  open?: () => void
  close?: () => void
}
const costVariants = [3000, 10000, 50000]
const countVariants = [1, 2, 3]

export const SelectNominal = memo(
  forwardRef<SelectNominalRefType, SelectNominalProps>(({onSubmit}, ref) => {
    const bottomSheetRef = useRef<BottomSheetRefType>(null)

    useImperativeHandle(ref, () => ({
      open: bottomSheetRef.current?.open,
      close: bottomSheetRef.current?.close,
    }))

    const content = useMemo(() => {
      return <Content onSubmit={onSubmit} />
    }, [onSubmit])

    return (
      <BottomSheet
        hasBottomTabs={false}
        title="ТИП ПОДАРОЧНОЙ КАРТЫ"
        closeDistance={100}
        showClose
        keyboardInsets={38}
        ref={bottomSheetRef}>
        {content}
      </BottomSheet>
    )
  }),
)

const Content = ({onSubmit}: SelectNominalProps) => {
  const [cost, setCost] = useState(costVariants[0])
  const [count, setCount] = useState(countVariants[0])

  return (
    <SafeLandscapeView maxWidth={600} safeArea>
      <Spacer height={16} />
      <View style={styles.rowContainer}>
        <Text gp5>Пластиковая</Text>
        <CheckIcon />
      </View>
      <Spacer height={16} />
      <View style={styles.rowContainer}>
        <Text gp5>Сумма и количество</Text>
        <Text gp1>
          {cost} ₽ - {count} шт.
        </Text>
      </View>
      <Spacer height={20} />
      {costVariants.map((item, id) => (
        <>
          <Spacer height={16} />
          <View style={styles.rowContainer} key={item}>
            <TouchableOpacity
              onPress={() => setCost(item)}
              style={styles.subItem}>
              <CircleCheckmarkIcon
                color={cost === item ? Color.primary : Color.secondaryGray}
              />
              <Spacer width={8} />
              <Text gp5>{cleanNumber(item, ' ', 0)}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCount(countVariants[id])}
              style={styles.subItem}>
              <CircleCheckmarkIcon
                color={
                  count === countVariants[id]
                    ? Color.primary
                    : Color.secondaryGray
                }
              />
              <Spacer width={8} />
              <Text gp5>{cleanNumber(countVariants[id], ' ', 0)}</Text>
            </TouchableOpacity>
          </View>
        </>
      ))}
      <Spacer height={16} />
      <Button gp5 onPress={() => onSubmit?.(count, cost)}>
        Продолжить
      </Button>
      <Spacer withBottomInsets height={56} />
    </SafeLandscapeView>
  )
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Color.border,
  },
  subItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
