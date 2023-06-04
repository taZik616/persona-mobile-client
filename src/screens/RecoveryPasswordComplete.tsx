import React, {useMemo, useRef} from 'react'

import {yupResolver} from '@hookform/resolvers/yup'
import {FormProvider, useForm} from 'react-hook-form'
import * as yup from 'yup'

import {RecoveryPasswordComplete} from 'src/components/RecoveryPasswordComplete'
import {useTypedNavigation, useTypedRoute} from 'src/hooks'
import {vibration} from 'src/services/vibration'
import {useRecoveryPasswordCompleteMutation} from 'src/store/shopApi'
import {UNKNOWN_ERROR_MSG} from 'src/variables'

const recPassCompleteSchema = yup
  .object({
    newPassword: yup.string().required('Обязательное поле'),
    newPasswordConfirmation: yup.string().required('Обязательное поле'),
  })
  .required()

type RecPassCompleteType = yup.InferType<typeof recPassCompleteSchema>

export const RecoveryPasswordCompleteScreen = () => {
  const recPassCompleteRef = useRef<any>()

  const [completeRecovery] = useRecoveryPasswordCompleteMutation()

  const form = useForm<RecPassCompleteType>({
    mode: 'onChange',
    resolver: yupResolver(recPassCompleteSchema),
  })

  const {phoneNumber, code} =
    useTypedRoute<'recoveryPasswordComplete'>().params || {}

  const {popToTop} = useTypedNavigation()

  const onSubmitForm = useMemo(
    () =>
      form.handleSubmit(
        async ({newPassword, newPasswordConfirmation}: RecPassCompleteType) => {
          if (newPassword !== newPasswordConfirmation) {
            vibration.error()
            recPassCompleteRef.current.setError('Пароли не совпадают')
            return
          }
          const res: any = await completeRecovery({
            phoneNumber,
            supposedCode: code,
            newPassword,
          })

          const error = res?.error?.data?.error
          if (res?.data?.success) {
            vibration.success()
            popToTop()
          } else if (error) {
            vibration.error()
            recPassCompleteRef.current.setError(error)
          } else {
            vibration.error()
            recPassCompleteRef.current.setError(UNKNOWN_ERROR_MSG)
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
      <RecoveryPasswordComplete
        ref={recPassCompleteRef}
        onSubmit={onSubmitForm}
      />
    </FormProvider>
  )
}
