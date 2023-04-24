import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'

import {useTypedNavigation} from 'src/hooks'

import {BottomSheet, BottomSheetRefType} from '../bottom-sheet'
import {Button} from '../ui/Button'
import {HangerIcon} from '../ui/icons/common'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {WheelPicker, WheelPickerRefType} from '../ui/WheelPicker'
type val = {
  value: number
  label: string
}
interface SizeSelectorProps {
  values: val[]
  onPressGoBasket?: () => void
  onPressContinue?: (item: val) => void
}

export interface SizeSelectorRefType {
  open?: () => void
  close?: () => void
}

export const SizeSelector = memo(
  forwardRef<SizeSelectorRefType, SizeSelectorProps>(
    ({onPressGoBasket, onPressContinue, values}, ref) => {
      const bottomSheetRef = useRef<BottomSheetRefType>(null)
      const wheelPickerRef = useRef<WheelPickerRefType>(null)
      const {navigate} = useTypedNavigation()

      const onPressRight = useCallback(() => {
        navigate('sizeChart')
      }, [])

      useImperativeHandle(ref, () => ({
        open: bottomSheetRef.current?.open,
        close: bottomSheetRef.current?.close,
      }))

      const content = useMemo(() => {
        const handleContinue = () => {
          onPressContinue?.(wheelPickerRef.current?.getSelected() ?? values[0])
        }
        return (
          <SafeLandscapeView>
            <Spacer height={16} />
            <WheelPicker ref={wheelPickerRef} values={values} />
            <Spacer height={16} />
            <Button onPress={handleContinue} gp5>
              Продолжить
            </Button>
            <Spacer withBottomInsets height={56} />
          </SafeLandscapeView>
        )
      }, [onPressGoBasket, onPressContinue])

      return (
        <BottomSheet
          onPressRight={onPressRight}
          rightIcon={<HangerIcon />}
          title="ВАШ РАЗМЕР"
          closeDistance={60}
          showClose
          ref={bottomSheetRef}>
          {content}
        </BottomSheet>
      )
    },
  ),
)
// const start = 10
// const values = new Array(start + 1)
//   .fill(0)
//   .map((_, i) => {
//     const value = start - i
//     return {value, label: `${value}`}
//   })
//   .reverse()
