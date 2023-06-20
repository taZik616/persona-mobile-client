import React, {memo} from 'react'

import {yupResolver} from '@hookform/resolvers/yup'
import {FormProvider, useForm} from 'react-hook-form'
import {StyleSheet} from 'react-native'
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated'
import * as yup from 'yup'

import {vibration} from 'src/services/vibration'
import {Color} from 'src/themes'

import {Button, FormTextInput, Spacer, Text} from 'ui/index'

const registrySchema = yup
  .object({
    firstName: yup
      .string()
      .required('Обязательное поле')
      .min(2, 'Слишком короткое имя')
      .max(35, 'Имя слишком длинное')
      .trim()
      .matches(/^\S*$/, 'Пробелы не разрешены в имени'),
    lastName: yup
      .string()
      .required('Обязательное поле')
      .min(2, 'Слишком короткая фамилия')
      .max(35, 'Фамилия слишком длинная')
      .trim()
      .matches(/^\S*$/, 'Пробелы не разрешены в фамилии'),
    phoneNumber: yup.string().trim().required('Обязательное поле').trim(),
  })
  .required()
export type RegistryFormType = yup.InferType<typeof registrySchema>

interface RegistryFormProps {
  requestError?: string
  onSubmit?: (formData: RegistryFormType) => void
  isLoading?: boolean
}

export const RegistryForm = memo(
  ({onSubmit, isLoading, requestError}: RegistryFormProps) => {
    const form = useForm<RegistryFormType>({
      resolver: yupResolver(registrySchema),
    })

    const onSubmitForm = async (data: RegistryFormType) => {
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
            placeholder="Имя"
            name="firstName"
            nextField="lastName"
          />
          <Spacer height={16} />
          <FormTextInput
            placeholder="Фамилия"
            name="lastName"
            nextField="phoneNumber"
          />
          <Spacer height={16} />
          <FormTextInput
            keyboardType="phone-pad"
            name="phoneNumber"
            placeholder="Номер телефона"
          />
          <Spacer height={16} />
          <Button
            gp5
            isLoading={isLoading}
            fullWidth
            onPress={form.handleSubmit(onSubmitForm, onInvalid)}>
            Подтвердить телефон
          </Button>
          <Spacer height={8} />
          {requestError && (
            <Text gp1 center style={styles.errorText} color={Color.textRed1}>
              {requestError}
            </Text>
          )}
        </FormProvider>
      </Animated.View>
    )
  },
)

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
