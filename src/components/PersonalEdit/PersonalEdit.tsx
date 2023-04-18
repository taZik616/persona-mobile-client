import React from 'react'

import {useFormContext} from 'react-hook-form'
import {ScrollView} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {YEAR_IN_MS} from 'src/variables'

import {FormDateTime} from '../ui/FormDateTime'
import {FormTextInput} from '../ui/FormTextInput'
import {Header} from '../ui/Header'
import {KeyboardSafeArea} from '../ui/KeyboardSafeArea'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'

interface PersonalEditProps {
  onPressBack?: () => void
  onSubmit?: () => void
}

export const PersonalEdit = ({onPressBack, onSubmit}: PersonalEditProps) => {
  const {
    formState: {isValid},
  } = useFormContext()
  const {bottom} = useSafeAreaInsets()

  return (
    <>
      <Header
        onPressBack={onPressBack}
        showBack
        rightTextDisabled={!isValid}
        title="Профиль"
        rightText="Сохранить"
        onPressRightText={onSubmit}
      />
      <KeyboardSafeArea>
        <ScrollView>
          <SafeLandscapeView safeArea>
            <Spacer height={20} />
            <FormTextInput placeholder="Имя" name="name" nextField="surname" />
            <Spacer height={16} />
            <FormTextInput placeholder="Фамилия" name="surname" />
            <Spacer height={20} />
            <FormDateTime
              placeholder="Дата рождения"
              name="dob"
              maximumDate={new Date(Date.now() - 6 * YEAR_IN_MS)}
            />
            <Spacer height={20} />
            <Text gp2>Контактные данные</Text>
            <Spacer height={14} />
            <FormTextInput
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCapitalize="none"
              placeholder="E-mail"
              name="email"
            />
            <Spacer height={20 + bottom} />
          </SafeLandscapeView>
        </ScrollView>
      </KeyboardSafeArea>
    </>
  )
}
