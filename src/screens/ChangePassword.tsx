import React, {useMemo, useRef} from 'react'

import {yupResolver} from '@hookform/resolvers/yup'
import {FormProvider, useForm} from 'react-hook-form'
import * as yup from 'yup'

import {ChangePassword} from 'src/components/ChangePassword'
import {useTypedNavigation} from 'src/hooks'
import {vibration} from 'src/services/vibration'
import {updateUserPassword} from 'src/store/profileSlice'

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
          // const creds = await getGenericPassword()
          // if (creds && currentPassword !== creds.password) {
          //   vibration.error()
          //   changePasswordRef.current?.setError(
          //     'Пароль от аккаунта и введенный не совпадают',
          //   )
          // } else
          if (newPassword !== newPasswordConfirmation) {
            vibration.error()
            changePasswordRef.current?.setError('Пароли не совпадают')
          } else {
            const error = await updateUserPassword(currentPassword, newPassword)
            if (error) {
              vibration.error()
              changePasswordRef.current?.setError(error)
            } else {
              vibration.success()
              goBack()
            }
          }
        },
        (error: any) => {
          vibration.error()
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
        onSubmit={onSubmit}
        onPressRecovery={onPressRecoverPassword}
      />
    </FormProvider>
  )
}
