import React, {useMemo, useRef} from 'react'

import {yupResolver} from '@hookform/resolvers/yup'
import {FormProvider, useForm} from 'react-hook-form'
import * as yup from 'yup'

import {RecoveryPasswordConfirm} from 'src/components/RecoveryPasswordConfirm'
import {useTypedNavigation, useTypedRoute} from 'src/hooks'
import {vibration} from 'src/services/vibration'
import {useChangePasswordMutation} from 'src/store/shopApi'
import {UNKNOWN_ERROR_MSG} from 'src/variables'

const recPassConfirmSchema = yup
  .object({
    newPassword: yup.string().required('Обязательное поле'),
    newPasswordConfirmation: yup.string().required('Обязательное поле'),
  })
  .required()

type RecPassConfirmType = yup.InferType<typeof recPassConfirmSchema>

export const RecoveryPasswordConfirmScreen = () => {
  const recPassConfirmRef = useRef<any>()

  const [changePassword] = useChangePasswordMutation()

  const form = useForm<RecPassConfirmType>({
    mode: 'onChange',
    resolver: yupResolver(recPassConfirmSchema),
  })

  const {telephone} = useTypedRoute<'recoveryPasswordConfirm'>().params || {}

  const {goBack, popToTop} = useTypedNavigation()

  const onSubmitForm = useMemo(
    () =>
      form.handleSubmit(
        async ({newPassword, newPasswordConfirmation}: RecPassConfirmType) => {
          if (newPassword !== newPasswordConfirmation) {
            vibration.error()
            recPassConfirmRef.current.setError('Пароли не совпадают')
            return
          }
          const res: any = await changePassword({
            telephone,
            password: newPassword,
          })

          const failedRes = res?.error?.data?.failed
          if (res?.data?.success) {
            vibration.success()
            popToTop()
          } else if (failedRes) {
            vibration.error()
            recPassConfirmRef.current.setError(failedRes)
          } else {
            vibration.error()
            recPassConfirmRef.current.setError(UNKNOWN_ERROR_MSG)
          }
        },
        (error: any) => {
          vibration.error()
          console.log('😭 - error:', error)
        },
      ),
    [],
  )

  return (
    <FormProvider {...form}>
      <RecoveryPasswordConfirm
        ref={recPassConfirmRef}
        onSubmit={onSubmitForm}
        onPressBack={goBack}
      />
    </FormProvider>
  )
}
