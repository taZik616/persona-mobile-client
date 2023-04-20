import React, {memo} from 'react'

import {PASSWORD_FAST_DEV_LOGIN, TELEPHONE_FAST_DEV_LOGIN} from '@env'
import {yupResolver} from '@hookform/resolvers/yup'
import {FormProvider, useForm} from 'react-hook-form'
import {StyleSheet} from 'react-native'
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated'
import * as yup from 'yup'

import {vibration} from 'src/services/vibration'
import {Color} from 'src/themes'
import {PHONE_VALIDATION_REGEXP} from 'src/variables'

import {Button} from '../ui/Button'
import {FormTextInput} from '../ui/FormTextInput'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'

const loginSchema = yup
  .object({
    telephone: yup
      .string()
      .trim()
      .required('Обязательное поле')
      .matches(PHONE_VALIDATION_REGEXP, 'Введен не корректный номер телефона'),
    password: yup.string().required('Обязательное поле'),
  })
  .required()

export type LoginFormType = yup.InferType<typeof loginSchema>

interface LoginFormProps {
  requestError?: string
  onSubmit?: (formData: LoginFormType) => void
}

export const LoginForm = memo(({onSubmit, requestError}: LoginFormProps) => {
  const form = useForm<LoginFormType>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      telephone: __DEV__ ? TELEPHONE_FAST_DEV_LOGIN : undefined,
      password: __DEV__ ? PASSWORD_FAST_DEV_LOGIN : undefined,
    },
  })
  const onSubmitForm = async (data: LoginFormType) => {
    onSubmit?.(data)
  }
  const onInvalid = async (e: any) => {
    vibration.error()
    console.log('😭 - error:', e)
  }

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={[styles.formContainer]}>
      <FormProvider {...form}>
        <FormTextInput
          name="telephone"
          keyboardType="phone-pad"
          placeholder="Номер телефона"
        />
        <Spacer height={16} />
        <FormTextInput
          name="password"
          autoCorrect={false}
          placeholder="Пароль"
        />
        <Spacer height={16} />
        <Button
          gp5
          fullWidth
          onPress={form.handleSubmit(onSubmitForm, onInvalid)}>
          Войти
        </Button>
        {requestError && (
          <>
            <Spacer height={8} />
            <Text gp1 center style={styles.errorText} color={Color.textRed1}>
              {requestError}
            </Text>
          </>
        )}
      </FormProvider>
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  formContainer: {
    borderWidth: 1,
    maxWidth: 600,
    width: '100%',
    borderColor: Color.primaryBlack,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  errorText: {
    width: '100%',
    marginHorizontal: 10,
    marginTop: 6,
    lineHeight: 14,
    flexWrap: 'wrap',
  },
})
