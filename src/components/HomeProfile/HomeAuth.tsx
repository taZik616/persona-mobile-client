import React, {useCallback, useEffect, useRef, useState} from 'react'

import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated'

import {captureException} from 'src/helpers'
import {useTypedDispatch} from 'src/store'
import {getUserData, setIsAuthenticated} from 'src/store/profileSlice'
import {
  useCreateUserAndSendCodeMutation,
  useLoginMutation,
  useVerifyUserCodeMutation,
} from 'src/store/shopApi'
import {Color} from 'src/themes'

import {LoginForm, LoginFormType} from './LoginForm'
import {RegistryForm, RegistryFormType} from './RegistryForm'

import {Button} from '../ui/Button'
import {InfoLightIcon} from '../ui/icons/common'
import {KeyboardSafeArea} from '../ui/KeyboardSafeArea'
import {OTPModal, OTPModalRefType} from '../ui/OTPModal'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'
import {ViewToggler} from '../ui/ViewToggler'

interface HomeAuthProps {
  onPressHelp?: () => void
}

export const HomeAuth = ({onPressHelp}: HomeAuthProps) => {
  const [authOption, setAuthOption] = useState(options[0].value)
  const [requestError, setRequestError] = useState('')

  const otpModalRef = useRef<OTPModalRefType>(null)
  const [createUserSendCode] = useCreateUserAndSendCodeMutation()
  const [verifyCode] = useVerifyUserCodeMutation()
  const [login] = useLoginMutation()

  const dispatch = useTypedDispatch()

  const sendVerifySms = useCallback(
    (telephone: string) => () => {
      createUserSendCode({telephone})
      otpModalRef.current?.resetTimer()
    },
    [],
  )
  useEffect(() => {
    requestError !== '' && setRequestError('')
  }, [authOption])

  const onRegistryStartVerification = useCallback(
    async (formData: RegistryFormType) => {
      try {
        const res: any = await createUserSendCode(formData)
        if (res?.error?.data.message) {
          setRequestError(res?.error?.data.message)
          return
        } else if (res?.data?.success) {
          otpModalRef.current?.openModal()
          // На всякий случай
          setTimeout(() => {
            otpModalRef.current?.setPhoneNumber(formData.telephone)
          }, 300)
        } else {
          setRequestError(
            'Неизвестная ошибка. Проверьте подключение к интернету',
          )
        }
      } catch (error) {
        captureException(error)
      }
    },
    [],
  )

  const onLogin = useCallback(async ({telephone, password}: LoginFormType) => {
    try {
      const res: any = await login({
        username: telephone,
        password,
      })
      if (res?.error?.data?.message) {
        setRequestError(res.error.data.message)
      } else if (res?.data?.success) {
        dispatch(setIsAuthenticated(true))
        dispatch(getUserData(telephone))
      } else {
        setRequestError('Неизвестная ошибка. Проверьте подключение к интернету')
      }
    } catch (error) {
      captureException(error)
    }
  }, [])

  const onCloseModal = useCallback(() => {
    otpModalRef.current?.closeModal()
    setRequestError('')
  }, [])

  const onRegistryCheckOtp = useCallback(
    async (code: string, telephone: string) => {
      const res: any = await verifyCode({code, telephone})
      if (res?.data?.failed) {
        otpModalRef.current?.setError(res.data.failed)
      } else if (res?.data?.success) {
        dispatch(setIsAuthenticated(true))
        dispatch(getUserData(telephone))
        onCloseModal()
      }
    },
    [onCloseModal],
  )

  const skipAuth = () => {
    __DEV__ && dispatch(setIsAuthenticated(true))
  }

  return (
    <KeyboardSafeArea>
      <ScrollView>
        <Spacer height={40} />
        <ViewToggler onEndToggle={setAuthOption} options={options} />
        <Spacer height={36} />
        <SafeLandscapeView center safeArea>
          {authOption === 'registry' ? (
            <RegistryForm
              requestError={requestError}
              onSubmit={onRegistryStartVerification}
            />
          ) : (
            <LoginForm requestError={requestError} onSubmit={onLogin} />
          )}
          <Spacer height={16} />
          <Animated.View
            key={authOption}
            entering={FadeIn}
            style={styles.helpContainer}
            exiting={FadeOut}>
            <TouchableOpacity onPress={onPressHelp} style={styles.helpBtn}>
              <InfoLightIcon color={Color.primaryBlack} />
              <Text gp4>Помощь</Text>
            </TouchableOpacity>
          </Animated.View>
          {__DEV__ && (
            <>
              <Spacer height={20} />
              <Button gp5 fullWidth onPress={skipAuth}>
                SKIP
              </Button>
            </>
          )}
        </SafeLandscapeView>
        <Spacer height={20} />
      </ScrollView>
      <OTPModal
        ref={otpModalRef}
        sendVerifySms={sendVerifySms}
        onSubmit={onRegistryCheckOtp}
        onCloseModal={onCloseModal}
      />
    </KeyboardSafeArea>
  )
}

const styles = StyleSheet.create({
  helpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  helpContainer: {
    alignSelf: 'flex-start',
  },
})

const options = [
  {
    title: 'Регистрация',
    value: 'registry',
  },
  {
    title: 'Вход',
    value: 'signIn',
  },
]
