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
  useRecoveryPasswordCheckMutation,
  useRecoveryPasswordSendCodeMutation,
} from 'src/store/shopApi'
import {PHONE_VALIDATION_REGEXP, UNKNOWN_ERROR_MSG} from 'src/variables'

const phoneEnterSchema = yup
  .object({
    phoneNumber: yup
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
  const [checkCode] = useRecoveryPasswordCheckMutation()

  const {phoneNumber: profilePhoneNumber} = useTypedSelector(selectProfile)

  const form = useForm<PhoneEnterType>({
    mode: 'onChange',
    resolver: yupResolver(phoneEnterSchema),
    defaultValues: {
      phoneNumber: profilePhoneNumber,
    },
  })

  const {navigate} = useTypedNavigation()

  const onSubmitForm = useMemo(
    () =>
      form.handleSubmit(
        async ({phoneNumber}: PhoneEnterType) => {
          const res: any = await sendCode({phoneNumber})

          const error = res?.error?.data?.error
          if (res?.data?.success) {
            vibration.success()
            otpRef.current?.openModal()
            setTimeout(() => otpRef.current?.setPhoneNumber(phoneNumber), 300)
          } else if (error) {
            vibration.error()
            enterPhoneRef.current.setError(error)
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

  const submitOtpCode = useCallback(
    async (code: string, phoneNumber: string) => {
      const res: any = await checkCode({phoneNumber, supposedCode: code})

      const error = res?.error?.data?.error
      if (res?.data?.success) {
        vibration.success()
        onCloseModal()
        setTimeout(() => {
          navigate('recoveryPasswordComplete', {phoneNumber, code})
        }, 250)
      } else if (error) {
        vibration.error()
        otpRef.current?.setError(error)
      } else {
        vibration.error()
        otpRef.current?.setError(UNKNOWN_ERROR_MSG)
      }
    },
    [],
  )

  const resendCode = useCallback(
    (phoneNumber: string) => async () => {
      const res: any = await sendCode({phoneNumber})
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
          disablePhoneInput={!!profilePhoneNumber}
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
