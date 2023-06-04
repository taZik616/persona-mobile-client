import React from 'react'

import {useFormContext} from 'react-hook-form'
import {ScrollView} from 'react-native'
import {
  FormDateTime,
  FormTextInput,
  Header,
  KeyboardSafeArea,
  SafeLandscapeView,
  Spacer,
  Text,
} from 'ui/index'

import {YEAR_IN_MS} from 'src/variables'

interface PersonalEditProps {
  onSubmit?: () => void
}

export const PersonalEdit = ({onSubmit}: PersonalEditProps) => {
  const {
    formState: {isValid},
  } = useFormContext()

  return (
    <>
      <Header
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
            <FormTextInput
              placeholder="Имя"
              name="firstName"
              nextField="lastName"
            />
            <Spacer height={16} />
            <FormTextInput placeholder="Фамилия" name="lastName" />
            <Spacer height={16} />
            <FormDateTime
              placeholder="Дата рождения"
              name="birthday"
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
            <Spacer height={20} withBottomInsets />
          </SafeLandscapeView>
        </ScrollView>
      </KeyboardSafeArea>
    </>
  )
}
