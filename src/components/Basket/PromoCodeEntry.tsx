import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

import {useFormContext} from 'react-hook-form'

import {Color} from 'src/themes'

import {BottomSheet, BottomSheetRefType} from '../bottom-sheet'
import {Button} from '../ui/Button'
import {FormTextInput} from '../ui/FormTextInput'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'

interface PromoCodeEntryProps {
  onSubmit?: () => void
}

export interface PromoCodeEntryRefType {
  open?: () => void
  close?: () => void
  setError: (err: string) => void
}

export const PromoCodeEntry = memo(
  forwardRef<PromoCodeEntryRefType, PromoCodeEntryProps>(({onSubmit}, ref) => {
    const bottomSheetRef = useRef<BottomSheetRefType>(null)
    const [error, setError] = useState('')

    const {
      formState: {isValid},
    } = useFormContext()

    useImperativeHandle(ref, () => ({
      open: bottomSheetRef.current?.open,
      close: bottomSheetRef.current?.close,
      setError,
    }))

    const content = useMemo(() => {
      return (
        <SafeLandscapeView maxWidth={600} safeArea>
          <Spacer height={16} />
          <FormTextInput placeholder="Введите промокод" name="promo" />
          {error ? (
            <Text color={Color.textRed1} gp1>
              {error}
            </Text>
          ) : (
            <></>
          )}
          <Spacer height={16} />
          <Button disabled={!isValid} gp5 onPress={onSubmit}>
            Продолжить
          </Button>
          <Spacer withBottomInsets height={56} />
        </SafeLandscapeView>
      )
    }, [onSubmit, isValid])

    return (
      <BottomSheet
        hasBottomTabs={false}
        title="ВВЕДИТЕ ПРОМОКОД"
        closeDistance={60}
        showClose
        keyboardInsets={38}
        ref={bottomSheetRef}>
        {content}
      </BottomSheet>
    )
  }),
)