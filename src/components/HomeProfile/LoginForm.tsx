import React, {memo} from 'react'

import {yupResolver} from '@hookform/resolvers/yup'
import {FormProvider, useForm} from 'react-hook-form'
import {StyleSheet} from 'react-native'
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated'
import * as yup from 'yup'

import {Color} from 'src/themes'
import {PHONE_VALIDATION_REGEXP} from 'src/variables'

import {Button} from '../ui/Button'
import {FormTextInput} from '../ui/FormTextInput'

const loginSchema = yup
  .object({
    telephone: yup
      .string()
      .required('Обязательное поле')
      .matches(PHONE_VALIDATION_REGEXP, 'Введен не корректный номер телефона'),
    password: yup.string().required('Обязательное поле'),
  })
  .required()

export type LoginFormType = yup.InferType<typeof loginSchema>

interface LoginFormProps {
  onSubmit?: (formData: LoginFormType) => void
}

export const LoginForm = memo(({onSubmit}: LoginFormProps) => {
  const form = useForm<LoginFormType>({
    resolver: yupResolver(loginSchema),
  })
  const onSubmitForm = async (data: LoginFormType) => {
    onSubmit?.(data)
  }
  const onInvalid = async (e: any) => {
    console.log('😭 - error:', e)
  }

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={[styles.formContainer]}>
      <FormProvider {...form}>
        <FormTextInput name="telephone" placeholder="Номер телефона" />
        <FormTextInput
          keyboardType="numeric"
          name="password"
          placeholder="Пароль"
        />
        <Button
          gp5
          fullWidth
          onPress={form.handleSubmit(onSubmitForm, onInvalid)}>
          Войти
        </Button>
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
    rowGap: 16,
  },
})
