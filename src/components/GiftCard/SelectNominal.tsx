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
  onSubmit?: (cost: number) => void
  isLoading?: boolean
}

export interface SelectNominalRefType {
  open?: () => void
  close?: () => void
  setAmountVariants: (variants: number[]) => void
  amountVariants: number[]
  setRequestError: (error: string) => void
}

export const SelectNominal = memo(
  forwardRef<SelectNominalRefType, SelectNominalProps>(
    ({onSubmit, isLoading}, ref) => {
      const bottomSheetRef = useRef<BottomSheetRefType>(null)
      const [amountVariants, setAmountVariants] = useState<number[]>([])
      const [requestError, setRequestError] = useState('')

      useImperativeHandle(ref, () => ({
        open: bottomSheetRef.current?.open,
        close: bottomSheetRef.current?.close,
        setAmountVariants,
        setRequestError,
        amountVariants,
      }))

      const content = useMemo(() => {
        return (
          <Content
            isLoading={isLoading}
            requestError={requestError}
            amountVariants={amountVariants}
            onSubmit={onSubmit}
          />
        )
      }, [onSubmit, requestError, amountVariants, isLoading])

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
    },
  ),
)

interface SelectNominalContentProps {
  onSubmit?: (cost: number) => void
  amountVariants: number[]
  requestError: string
  isLoading?: boolean
}

const Content = ({
  onSubmit,
  requestError,
  amountVariants,
  isLoading,
}: SelectNominalContentProps) => {
  const [cost, setCost] = useState(amountVariants[0])
  // const [count, setCount] = useState(countVariants[0])

  return (
    <SafeLandscapeView maxWidth={600} safeArea>
      <Spacer height={16} />
      <View style={styles.rowContainer}>
        <Text gp5>Пластиковая</Text>
        <CheckIcon />
      </View>
      <Spacer height={16} />
      <View style={styles.rowContainer}>
        <Text gp5>Сумма</Text>
        <Text gp1>{cost} ₽</Text>
        {/* <Text gp5>Сумма и количество</Text>
        <Text gp1>
          {cost} ₽ - {count} шт.
        </Text> */}
      </View>
      <Spacer height={20} />
      {amountVariants.map(item => (
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
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
          </View>
        </>
      ))}
      {requestError && (
        <>
          <Spacer height={8} />
          <Text gp1 color={Color.textRed1}>
            {requestError}
          </Text>
        </>
      )}
      <Spacer height={16} />
      <Button isLoading={isLoading} gp5 onPress={() => onSubmit?.(cost)}>
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
