import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import {Color} from 'src/themes'
import {CARD_ASPECT_RATIO} from 'src/variables'

import {CameraIcon} from 'ui/icons/common'
import {
  Header,
  KeyboardSafeArea,
  SafeLandscapeView,
  Spacer,
  Text,
} from 'ui/index'

interface LoyaltyCardAddProps {
  onPressScanCard?: () => void
  onNext?: (cardNumber: string) => void
}

export const LoyaltyCardAdd = memo(
  forwardRef(({onPressScanCard, onNext}: LoyaltyCardAddProps, ref: any) => {
    const [canGoNext, setCanGoNext] = useState(false)
    const [error, setError] = useState('')
    const [warning, setWarning] = useState('')
    const cardNumber = useRef('')
    const cardInputRef = useRef<any>(null)

    useImperativeHandle(ref, () => ({
      setError: (err: string) => {
        setError(err)
        clearWarning()
      },
      setWarning: (err: string) => {
        setWarning(err)
        clearError()
      },
      setValue: cardInputRef.current?.setValue,
    }))

    const clearWarning = useCallback(() => {
      warning && setWarning('')
    }, [warning])

    const clearError = useCallback(() => {
      error && setError('')
    }, [error])

    const onSubmit = useCallback(() => {
      onNext?.(cardNumber.current)
    }, [])

    const onChangeCardNumber = (cardNum: string) => {
      cardNumber.current = cardNum
      if (cardNum.length === 16) {
        !canGoNext && setCanGoNext(true)
      } else {
        canGoNext && setCanGoNext(false)
      }
    }

    return (
      <>
        <Header
          title="Карта лояльности"
          rightText="Далее"
          onPressRightText={onSubmit}
          rightTextDisabled={!canGoNext}
          showBack
        />
        <KeyboardSafeArea>
          <ScrollView>
            <SafeLandscapeView safeArea>
              <Spacer height={20} />
              <View style={styles.cardContainer}>
                <CardInput
                  ref={cardInputRef}
                  clearError={clearError}
                  clearWarning={clearWarning}
                  onChange={onChangeCardNumber}
                  onPressPhoto={onPressScanCard}
                />
              </View>
              <Text maxWidth={500} center color={Color.primaryGray} gp1>
                Телефонный звонок для подтверждения статуса карты будет
                отправлен на номер телефона, указанный при регистрации
              </Text>
              {warning && (
                <>
                  <Spacer height={12} />
                  <Text gp1 maxWidth={500} center color={Color.textYellow1}>
                    {warning}
                  </Text>
                </>
              )}
              {error && (
                <>
                  <Spacer height={12} />
                  <Text gp1 maxWidth={500} center color={Color.textRed1}>
                    {error}
                  </Text>
                </>
              )}
              <Spacer height={30} />
            </SafeLandscapeView>
          </ScrollView>
        </KeyboardSafeArea>
      </>
    )
  }),
)

interface CardInputProps {
  onChange?: (text: string) => void
  onPressPhoto?: () => void
  clearError?: () => void
  clearWarning?: () => void
}

const CardInput = memo(
  forwardRef(
    (
      {onChange, onPressPhoto, clearError, clearWarning}: CardInputProps,
      ref,
    ) => {
      const [value, setValue] = useState('')

      const handleChange = useCallback(
        (text: string) => {
          clearError?.()
          clearWarning?.()
          const withoutSpaces = text.replaceAll(' ', '')
          const chunks: string[] = []
          for (let i = 0; i < withoutSpaces.length; i += 4) {
            const chunk = withoutSpaces.slice(i, i + 4)
            chunks.push(chunk)
          }
          setValue(chunks.join(' '))
          onChange?.(withoutSpaces)
        },
        [onChange],
      )

      useImperativeHandle(
        ref,
        () => ({
          setValue: handleChange,
        }),
        [handleChange],
      )

      return (
        <View style={styles.inputContainer}>
          <TextInput
            maxLength={19}
            hitSlop={{bottom: 20, top: 20, left: 16, right: 16}}
            style={styles.input}
            value={value}
            keyboardType="numeric"
            textContentType="creditCardNumber"
            placeholderTextColor={Color.primaryGray}
            placeholder="0000 0000 0000 0000"
            onChangeText={handleChange}
          />
          <Spacer width={20} />
          <TouchableOpacity hitSlop={10} onPress={onPressPhoto}>
            <CameraIcon />
          </TouchableOpacity>
        </View>
      )
    },
  ),
)
const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
    marginBottom: 8,
    width: '100%',
    aspectRatio: 1.51,
    backgroundColor: Color.primaryOpacity1,
    borderRadius: 16,
    paddingBottom: 32,
    maxWidth: 400,
    maxHeight: 400 / CARD_ASPECT_RATIO,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  inputContainer: {
    backgroundColor: Color.primaryOpacity1,
    width: '100%',
    height: 64,
    paddingLeft: 30,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    color: Color.primaryBlack,
    flex: 1,
    fontFamily: 'GothamPro-Medium',
    fontSize: 15,
  },
})
