import React, {useCallback, useMemo, useRef} from 'react'

import {yupResolver} from '@hookform/resolvers/yup'
import {RecoveryPasswordEnterPhone} from 'components/RecoveryPasswordEnterPhone'
import {FormProvider, useForm} from 'react-hook-form'
import {OTPModal, OTPModalRefType} from 'ui/OTP'
import * as yup from 'yup'

import {useTypedNavigation} from 'src/hooks'
import {vibration} from 'src/services/vibration'
import {selectProfile, useTypedSelector} from 'src/store'
import {
  useRecoveryPasswordSendCodeMutation,
  useRecoveryPasswordVerifyCodeMutation,
} from 'src/store/shopApi'
import {PHONE_VALIDATION_REGEXP, UNKNOWN_ERROR_MSG} from 'src/variables'

const phoneEnterSchema = yup
  .object({
    telephone: yup
      .string()
      .trim()
      .required('Обязательное поле')
      .matches(PHONE_VALIDATION_REGEXP, 'Введен не корректный номер телефона'),
  })
  .required()

type PhoneEnterType = yup.InferType<typeof phoneEnterSchema>

export const RecoveryPasswordEnterPhoneScreen = () => {
  const enterPhoneRef = useRef<any>()
  const otpRef = useRef<OTPModalRefType>(null)

  const [sendCode] = useRecoveryPasswordSendCodeMutation()
  const [verifyCode] = useRecoveryPasswordVerifyCodeMutation()

  const {phoneNumber} = useTypedSelector(selectProfile)

  const form = useForm<PhoneEnterType>({
    mode: 'onChange',
    resolver: yupResolver(phoneEnterSchema),
    defaultValues: {
      telephone: phoneNumber,
    },
  })

  const {navigate} = useTypedNavigation()

  const onSubmitForm = useMemo(
    () =>
      form.handleSubmit(
        async ({telephone}: PhoneEnterType) => {
          const res: any = await sendCode({telephone})
          const failedRes = res?.error?.data?.failed
          if (res?.data?.success) {
            vibration.success()
            otpRef.current?.openModal()
            setTimeout(() => otpRef.current?.setPhoneNumber(telephone), 300)
          } else if (failedRes) {
            vibration.error()
            enterPhoneRef.current.setError(failedRes)
          } else {
            vibration.error()
            enterPhoneRef.current.setError(UNKNOWN_ERROR_MSG)
          }
        },
        (error: any) => {
          vibration.error()
          console.log('😭 - error:', error)
        },
      ),
    [],
  )

  const submitOtpCode = useCallback(async (code: string, telephone: string) => {
    const res: any = await verifyCode({telephone, code})

    const failedRes = res?.error?.data?.failed

    if (res?.data?.success) {
      vibration.success()
      navigate('recoveryPasswordConfirm', {telephone})
    } else if (failedRes) {
      vibration.error()
      otpRef.current?.setError(failedRes)
    } else {
      vibration.error()
      otpRef.current?.setError(UNKNOWN_ERROR_MSG)
    }
  }, [])

  const resendCode = useCallback(
    (telephone: string) => async () => {
      const res: any = await sendCode({telephone})
      const failedRes = res?.error?.data?.failed
      if (res?.data?.success) {
        vibration.success()
        otpRef.current?.resetTimer()
      } else if (failedRes) {
        vibration.error()
        otpRef.current?.setError(failedRes)
      } else {
        vibration.error()
        otpRef.current?.setError(UNKNOWN_ERROR_MSG)
      }
    },
    [sendCode],
  )

  const onCloseModal = useCallback(() => {
    otpRef.current?.closeModal()
  }, [])

  return (
    <>
      <FormProvider {...form}>
        <RecoveryPasswordEnterPhone
          ref={enterPhoneRef}
          disablePhoneInput={!!phoneNumber}
          onSubmit={onSubmitForm}
        />
      </FormProvider>
      <OTPModal
        onSubmit={submitOtpCode}
        sendVerifySms={resendCode}
        onCloseModal={onCloseModal}
        ref={otpRef}
      />
    </>
  )
}
