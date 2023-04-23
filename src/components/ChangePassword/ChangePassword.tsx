import React, {forwardRef, useImperativeHandle, useState} from 'react'

import {useFormContext} from 'react-hook-form'
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native'

import {Color} from 'src/themes'

import {Button} from '../ui/Button'
import {FormTextInput} from '../ui/FormTextInput'
import {Header} from '../ui/Header'
import {KeyboardSafeArea} from '../ui/KeyboardSafeArea'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'

interface ChangePasswordProps {
  onPressRecovery?: () => void
  onSubmit?: () => void
}

export const ChangePassword = forwardRef<any, ChangePasswordProps>(
  ({onPressRecovery, onSubmit}, ref) => {
    const {
      formState: {isValid},
    } = useFormContext()
    const [error, setError] = useState('')
    useImperativeHandle(ref, () => ({
      setError,
    }))

    return (
      <>
        <Header title="Изменение пароля" showBack hideSearch hideBasket />
        <KeyboardSafeArea>
          <ScrollView>
            <SafeLandscapeView safeArea>
              <Spacer height={20} />
              <Text gp2>Текущий пароль</Text>
              <Spacer height={14} />
              <FormTextInput
                textContentType="password"
                autoCapitalize="none"
                placeholder="Текущий пароль"
                name="currentPassword"
              />
              <Spacer height={10} />
              <TouchableOpacity
                onPress={onPressRecovery}
                style={styles.recoveryBtn}>
                <Text color={Color.primary}>Забыли пароль?</Text>
              </TouchableOpacity>
              <Spacer height={20} />
              <Text gp2>Новый пароль</Text>
              <Spacer height={14} />
              <FormTextInput
                textContentType="newPassword"
                autoCapitalize="none"
                placeholder="Новый пароль"
                name="newPassword"
              />
              <Spacer height={16} />
              <FormTextInput
                textContentType="newPassword"
                autoCapitalize="none"
                placeholder="Подтвердите новый пароль"
                name="newPasswordConfirmation"
              />
              {error && (
                <>
                  <Spacer height={8} />
                  <Text gp1 maxWidth={500} center color={Color.textRed1}>
                    {error}
                  </Text>
                </>
              )}
              <Spacer height={16} />
              <Button gp5 disabled={!isValid} onPress={onSubmit}>
                Изменить
              </Button>
              <Spacer height={20} withBottomInsets />
            </SafeLandscapeView>
          </ScrollView>
        </KeyboardSafeArea>
      </>
    )
  },
)

const styles = StyleSheet.create({
  recoveryBtn: {
    alignSelf: 'flex-end',
  },
})
