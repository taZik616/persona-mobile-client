import React, {useCallback, useEffect, useRef, useState} from 'react'

import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated'

import {captureException} from 'src/helpers'
import {storePassword} from 'src/helpers/keychain'
import {vibration} from 'src/services/vibration'
import {useTypedDispatch} from 'src/store'
import {
  getUserData,
  setAuthToken,
  setIsAuthenticated,
} from 'src/store/profileSlice'
import {
  useCreateUserAndSendCodeMutation,
  useLoginMutation,
  useVerifyUserCodeMutation,
} from 'src/store/shopApi/shopApi'
import {Color} from 'src/themes'
import {UNKNOWN_ERROR_MSG} from 'src/variables'

import {LoginForm, LoginFormType} from './LoginForm'
import {RegistryForm, RegistryFormType} from './RegistryForm'

import {Button} from '../ui/Button'
import {InfoLightIcon} from '../ui/icons/common'
import {KeyboardSafeArea} from '../ui/KeyboardSafeArea'
import {OTPModal, OTPModalRefType} from '../ui/OTPModal'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'
import {ViewTogglerWHM} from '../ui/ViewToggler'

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

  const otpModalRef = useRef<OTPModalRefType>(null)
  const [createUserSendCode] = useCreateUserAndSendCodeMutation()
  const [verifyCode] = useVerifyUserCodeMutation()
  const [login] = useLoginMutation()

  const dispatch = useTypedDispatch()

  const sendVerifySms = useCallback(
    (telephone: string) => () => {
      vibration.rigid()
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

        if (res?.error?.data?.error) {
          vibration.error()
          setRequestError(res.error.data.error)
          return
        } else if (res?.data?.success) {
          vibration.success()
          otpModalRef.current?.openModal()
          // На всякий случай
          setTimeout(() => {
            otpModalRef.current?.setPhoneNumber(formData.telephone)
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

  const onLogin = useCallback(async ({telephone, password}: LoginFormType) => {
    try {
      const res: any = await login({
        username: telephone,
        password,
      })
      if (res?.error?.data?.error) {
        vibration.error()
        setRequestError(res.error.data.message)
      } else if (res?.data?.success && res.data.token) {
        vibration.success()
        dispatch(setIsAuthenticated(true))
        dispatch(setAuthToken(res.data.token))
        dispatch(getUserData)
        await storePassword({user: telephone, password})
      } else {
        vibration.error()
        setRequestError(UNKNOWN_ERROR_MSG)
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
        vibration.error()
        otpModalRef.current?.setError(res.data.failed)
      } else if (res?.data?.success) {
        vibration.success()
        dispatch(setIsAuthenticated(true))
        dispatch(setAuthToken(res.data.token))
        dispatch(getUserData)
        onCloseModal()
        await storePassword({user: telephone, password: code})
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
