import React, {useCallback, useRef, useState} from 'react'

import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import {Color} from 'src/themes'
import {CARD_ASPECT_RATIO} from 'src/variables'

import {Header} from '../ui/Header'
import {CameraIcon} from '../ui/icons/common'
import {KeyboardSafeArea} from '../ui/KeyboardSafeArea'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'

interface LoyaltyCardAddProps {
  onPressBack?: () => void
  onPressScanCard?: () => void
  onNext?: (cardNumber: string) => void
}

export const LoyaltyCardAdd = ({
  onPressBack,
  onPressScanCard,
  onNext,
}: LoyaltyCardAddProps) => {
  const [canGoNext, setCanGoNext] = useState(false)
  const cardNumber = useRef('')

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
        title={'Карта лояльности'}
        rightText={'Далее'}
        onPressRightText={onSubmit}
        rightTextDisabled={!canGoNext}
        showBack
        onPressBack={onPressBack}
      />
      <KeyboardSafeArea>
        <ScrollView>
          <SafeLandscapeView safeArea>
            <Spacer height={20} />
            <View style={styles.cardContainer}>
              <CardInput
                onChange={onChangeCardNumber}
                onPressPhoto={onPressScanCard}
              />
            </View>
            <Text maxWidth={500} center color={Color.primaryGray} gp1>
              Телефонный звонок для подтверждения статуса карты будет отправлен
              на номер телефона, указанный при регистрации
            </Text>
            <Spacer height={30} />
          </SafeLandscapeView>
        </ScrollView>
      </KeyboardSafeArea>
    </>
  )
}

interface CardInputProps {
  onChange?: (text: string) => void
  onPressPhoto?: () => void
}

const CardInput = ({onChange, onPressPhoto}: CardInputProps) => {
  const [value, setValue] = useState('')

  const handleChange = useCallback(
    (text: string) => {
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
  return (
    <View style={styles.inputContainer}>
      <TextInput
        maxLength={19}
        hitSlop={{bottom: 20, top: 20, left: 16, right: 16}}
        style={styles.input}
        value={value}
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
}

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
