import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

import {BottomSheet, BottomSheetRefType} from 'components/bottom-sheet'
import {useFormContext} from 'react-hook-form'
import {StyleSheet} from 'react-native'

import {Color} from 'src/themes'

import {Button, FormTextInput, SafeLandscapeView, Spacer, Text} from 'ui/index'

interface PromoCodeEntryProps {
  onSubmit?: () => void
}

export interface PromoCodeEntryRefType {
  open?: () => void
  close?: () => void
  setError: (err: string) => void
  setIsLoading: (loading: boolean) => void
  isLoading?: boolean
}

export const PromoCodeEntry = memo(
  forwardRef<PromoCodeEntryRefType, PromoCodeEntryProps>(({onSubmit}, ref) => {
    const bottomSheetRef = useRef<BottomSheetRefType>(null)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const {
      formState: {isValid},
    } = useFormContext()

    useImperativeHandle(ref, () => ({
      open: bottomSheetRef.current?.open,
      close: bottomSheetRef.current?.close,
      setError,
      setIsLoading,
    }))

    const content = useMemo(() => {
      return (
        <SafeLandscapeView maxWidth={600} safeArea>
          <Spacer height={16} />
          <FormTextInput placeholder="Введите промокод" name="promo" />
          <Spacer height={4} />
          {error ? (
            <Text style={styles.error} color={Color.textRed1} gp1>
              {error}
            </Text>
          ) : (
            <></>
          )}
          <Spacer height={16} />
          <Button
            isLoading={isLoading}
            disabled={!isValid}
            gp5
            onPress={onSubmit}>
            Продолжить
          </Button>
          <Spacer withBottomInsets height={56} />
        </SafeLandscapeView>
      )
    }, [onSubmit, isValid, error, isLoading])

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

const styles = StyleSheet.create({
  error: {marginLeft: 8},
})
