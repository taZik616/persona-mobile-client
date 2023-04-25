import React, {forwardRef, useImperativeHandle, useState} from 'react'

import {useFormContext} from 'react-hook-form'
import {ScrollView} from 'react-native'

import {Color} from 'src/themes'

import {FormTextInput} from '../ui/FormTextInput'
import {Header} from '../ui/Header'
import {KeyboardSafeArea} from '../ui/KeyboardSafeArea'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'

interface RecPassConfirmProps {
  onSubmit?: () => void
}

export const RecoveryPasswordConfirm = forwardRef<any, RecPassConfirmProps>(
  ({onSubmit}, ref) => {
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
          showBack
          rightText="Сменить"
          rightTextDisabled={!isValid}
          onPressRightText={onSubmit}
          hideSearch
          hideBasket
        />
        <KeyboardSafeArea>
          <ScrollView>
            <SafeLandscapeView safeArea>
              <Spacer height={20} />
              <Text gp2>Новый пароль</Text>
              <Spacer height={14} />
              <FormTextInput
                textContentType="newPassword"
                autoCapitalize="none"
                nextField="newPasswordConfirmation"
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
              <Spacer height={20} withBottomInsets />
            </SafeLandscapeView>
          </ScrollView>
        </KeyboardSafeArea>
      </>
    )
  },
)
