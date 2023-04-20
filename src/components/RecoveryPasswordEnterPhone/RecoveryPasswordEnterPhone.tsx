import React, {forwardRef, useImperativeHandle, useState} from 'react'

import {useFormContext} from 'react-hook-form'
import {ScrollView, StyleSheet} from 'react-native'

import {Color} from 'src/themes'

import {Button} from '../ui/Button'
import {FormTextInput} from '../ui/FormTextInput'
import {Header} from '../ui/Header'
import {Logo} from '../ui/icons/logo'
import {KeyboardSafeArea} from '../ui/KeyboardSafeArea'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'

interface RecoveryPasswordEnterPhoneProps {
  onPressBack?: () => void
  onSubmit?: () => void
  disablePhoneInput?: boolean
}

export const RecoveryPasswordEnterPhone = forwardRef<
  any,
  RecoveryPasswordEnterPhoneProps
>(({onPressBack, onSubmit, disablePhoneInput}, ref) => {
  const {
    formState: {isValid},
  } = useFormContext()

  const [error, setError] = useState('')
  useImperativeHandle(ref, () => ({
    setError,
  }))

  return (
    <>
      <Header
        title="Восстановление пароля"
        onPressBack={onPressBack}
        showBack
        hideSearch
        hideBasket
      />
      <KeyboardSafeArea>
        <ScrollView>
          <SafeLandscapeView safeArea>
            <Spacer height={20} />
            <Logo style={styles.logo} width={120} />
            <Spacer height={16} />
            <FormTextInput
              editable={!disablePhoneInput}
              focusable={!disablePhoneInput}
              textContentType="telephoneNumber"
              autoCapitalize="none"
              keyboardType="phone-pad"
              placeholder="Телефон"
              name="telephone"
            />
            <Spacer height={16} />
            <Button gp5 disabled={!isValid} onPress={onSubmit}>
              Продолжить
            </Button>
            {error && (
              <>
                <Spacer height={8} />
                <Text gp1 maxWidth={500} center color={Color.textRed1}>
                  {error}
                </Text>
              </>
            )}
            <Spacer height={20} withBottomInsets />
          </SafeLandscapeView>
        </ScrollView>
      </KeyboardSafeArea>
    </>
  )
})

const styles = StyleSheet.create({
  recoveryBtn: {
    alignSelf: 'flex-end',
  },
  logo: {
    alignSelf: 'center',
  },
})
