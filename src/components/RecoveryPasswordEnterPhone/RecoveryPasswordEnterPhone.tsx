import React, {forwardRef, useImperativeHandle, useState} from 'react'

import {useFormContext} from 'react-hook-form'
import {ScrollView, StyleSheet} from 'react-native'

import {Color} from 'src/themes'

import {Logo} from 'ui/icons/logo'
import {
  Button,
  FormTextInput,
  Header,
  KeyboardSafeArea,
  SafeLandscapeView,
  Spacer,
  Text,
} from 'ui/index'

interface RecoveryPasswordEnterPhoneProps {
  onSubmit?: () => void
  disablePhoneInput?: boolean
  isLoading?: boolean
}

export const RecoveryPasswordEnterPhone = forwardRef<
  any,
  RecoveryPasswordEnterPhoneProps
>(({onSubmit, isLoading, disablePhoneInput}, ref) => {
  const {
    formState: {isValid},
  } = useFormContext()

  const [error, setError] = useState('')
  useImperativeHandle(ref, () => ({
    setError,
  }))

  return (
    <>
      <Header title="Восстановление пароля" showBack hideSearch hideBasket />
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
              name="phoneNumber"
            />
            <Spacer height={16} />
            <Button
              isLoading={isLoading}
              gp5
              disabled={!isValid}
              onPress={onSubmit}>
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
