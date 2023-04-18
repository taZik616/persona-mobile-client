import React, {useMemo, useRef} from 'react'

import {yupResolver} from '@hookform/resolvers/yup'
import {FormProvider, useForm} from 'react-hook-form'
import {getGenericPassword} from 'react-native-keychain'
import * as yup from 'yup'

import {ChangePassword} from 'src/components/ChangePassword'
import {useTypedNavigation} from 'src/hooks'

const passwordEditSchema = yup
  .object({
    currentPassword: yup.string().required('Обязательное поле'),
    newPassword: yup.string().required('Обязательное поле'),
    newPasswordConfirmation: yup.string().required('Обязательное поле'),
  })
  .required()

type PasswordEditType = yup.InferType<typeof passwordEditSchema>

export const ChangePasswordScreen = () => {
  const {goBack, navigate} = useTypedNavigation()
  const changePasswordRef = useRef<any>()

  const form = useForm<PasswordEditType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(passwordEditSchema),
  })

  const onSubmit = useMemo(
    () =>
      form.handleSubmit(
        async ({
          newPassword,
          currentPassword,
          newPasswordConfirmation,
        }: PasswordEditType) => {
          const creds = await getGenericPassword()

          if (creds && currentPassword !== creds.password) {
            changePasswordRef.current?.setError(
              'Пароль от аккаунта и введенный не совпадают',
            )
          } else if (newPassword !== newPasswordConfirmation) {
            changePasswordRef.current?.setError('Пароли не совпадают')
          } else {
            goBack()
          }
        },
        (error: any) => {
          console.log('😭 - error:', error)
        },
      ),
    [],
  )

  const onPressRecoverPassword = () => navigate('recoveryPasswordEnterPhone')

  return (
    <FormProvider {...form}>
      <ChangePassword
        ref={changePasswordRef}
        onPressBack={goBack}
        onSubmit={onSubmit}
        onPressRecovery={onPressRecoverPassword}
      />
    </FormProvider>
  )
}
