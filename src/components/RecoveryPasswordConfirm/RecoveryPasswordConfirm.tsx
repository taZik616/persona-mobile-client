import React, {forwardRef, useImperativeHandle, useState} from 'react'

import {useFormContext} from 'react-hook-form'
import {ScrollView} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {Color} from 'src/themes'

import {FormTextInput} from '../ui/FormTextInput'
import {Header} from '../ui/Header'
import {KeyboardSafeArea} from '../ui/KeyboardSafeArea'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'

interface RecPassConfirmProps {
  onPressBack?: () => void
  onSubmit?: () => void
}

export const RecoveryPasswordConfirm = forwardRef<any, RecPassConfirmProps>(
  ({onPressBack, onSubmit}, ref) => {
    const {
      formState: {isValid},
    } = useFormContext()
    const [error, setError] = useState('')
    useImperativeHandle(ref, () => ({
      setError,
    }))

    const {bottom} = useSafeAreaInsets()

    return (
      <>
        <Header
          title="Восстановление пароля"
          onPressBack={onPressBack}
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
              <Spacer height={20 + bottom} />
            </SafeLandscapeView>
          </ScrollView>
        </KeyboardSafeArea>
      </>
    )
  },
)
