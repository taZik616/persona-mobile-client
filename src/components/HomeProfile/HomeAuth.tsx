import React, {useCallback, useEffect, useRef, useState} from 'react'

import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated'

import {captureException} from 'src/helpers'
import {useTypedNavigation, useTypedRouteHome} from 'src/hooks'
import {vibration} from 'src/services/vibration'
import {useTypedDispatch} from 'src/store'
import {onSuccessfulLogin, setIsAuthenticated} from 'src/store/profileSlice'
import {
  useCreateUserAndSendCodeMutation,
  useLoginMutation,
  useResendRegistryCodeMutation,
} from 'src/store/shopApi'
import {Color} from 'src/themes'
import {UNKNOWN_ERROR_MSG} from 'src/variables'

import {InfoLightIcon} from 'ui/icons/common'
import {
  Button,
  KeyboardSafeArea,
  SafeLandscapeView,
  Spacer,
  Text,
  ViewTogglerWHM,
} from 'ui/index'
import {OTPModal, OTPModalRefType} from 'ui/OTP'

import {LoginForm, LoginFormType} from './LoginForm'
import {RegistryForm, RegistryFormType} from './RegistryForm'

interface HomeAuthProps {
  onPressHelp?: () => void
  onPressRecoverPassword?: () => void
}

export const HomeAuth = ({
  onPressHelp,
  onPressRecoverPassword,
}: HomeAuthProps) => {
  const [authOption, setAuthOption] = useState(options[0].value)
  const [requestError, setRequestError] = useState('')
  const {whenLoginGoToBasket} = useTypedRouteHome<'homeProfile'>().params ?? {}
  const {navigate} = useTypedNavigation()

  const otpModalRef = useRef<OTPModalRefType>(null)
  const [createUserSendCode, {isLoading: isRegistryLoading}] =
    useCreateUserAndSendCodeMutation()
  const [resendRegistryCode] = useResendRegistryCodeMutation()
  const [login, {isLoading: isLoginLoading}] = useLoginMutation()

  const dispatch = useTypedDispatch()

  const resendVerifySms = useCallback(
    (phoneNumber: string) => async () => {
      vibration.rigid()
      const res: any = await resendRegistryCode({phoneNumber})
      const error = res?.error?.data?.error
      if (error) {
        otpModalRef.current?.setError(error)
      } else if (res?.data?.success) {
        otpModalRef.current?.resetTimer()
        otpModalRef.current?.setError('')
      }
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
        const error = res?.error?.data?.error
        if (error) {
          vibration.error()
          setRequestError(error)
          return
        } else if (res?.data?.success) {
          vibration.success()
          otpModalRef.current?.openModal()
          // На всякий случай
          setTimeout(() => {
            otpModalRef.current?.setPhoneNumber(formData.phoneNumber)
            otpModalRef.current?.setTimer(10)
          }, 300)
        } else {
          vibration.error()
          setRequestError(UNKNOWN_ERROR_MSG)
        }
      } catch (error) {
        captureException(error)
      }
    },
    [],
  )

  const onLogin = useCallback(
    async ({telephone, password}: LoginFormType) => {
      try {
        const res: any = await login({
          username: telephone,
          password,
        })
        const error = res?.error?.data?.error
        const token = res?.data?.token
        if (error) {
          vibration.error()
          setRequestError(error)
        } else if (token) {
          vibration.success()
          dispatch(
            onSuccessfulLogin({
              token,
              user: telephone,
              password,
            }),
          )
          whenLoginGoToBasket && navigate('basket')
        } else {
          vibration.error()
          setRequestError(UNKNOWN_ERROR_MSG)
        }
      } catch (error) {
        captureException(error)
      }
    },
    [whenLoginGoToBasket],
  )

  const onCloseModal = useCallback(() => {
    otpModalRef.current?.closeModal()
    setRequestError('')
  }, [])

  const onRegistryCheckOtp = useCallback(
    async (code: string, telephone: string) => {
      const res: any = await login({password: code, username: telephone})
      const error = res?.error?.data?.error
      const token = res?.data?.token
      if (error) {
        vibration.error()
        otpModalRef.current?.setError(error)
      } else if (token) {
        vibration.success()
        dispatch(
          onSuccessfulLogin({
            token,
            user: telephone,
            password: code,
          }),
        )
        whenLoginGoToBasket && navigate('basket')
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
        <ViewTogglerWHM onEndToggle={setAuthOption} options={options} />
        <Spacer height={36} />
        <SafeLandscapeView center safeArea>
          {authOption === 'registry' ? (
            <RegistryForm
              isLoading={isRegistryLoading}
              requestError={requestError}
              onSubmit={onRegistryStartVerification}
            />
          ) : (
            <LoginForm
              isLoading={isLoginLoading}
              requestError={requestError}
              onSubmit={onLogin}
            />
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
            <Spacer />
            <TouchableOpacity
              onPress={onPressRecoverPassword}
              style={styles.helpBtn}>
              <Text gp4 color={Color.primary}>
                Забыли пароль?
              </Text>
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
        isLoading={isLoginLoading}
        ref={otpModalRef}
        sendVerifySms={resendVerifySms}
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
    flexDirection: 'row',
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
