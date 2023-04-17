import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated'
import {Keyframe} from 'react-native-reanimated'

import {captureException, formatSecondsTimer} from 'src/helpers'
import {useScreenBlockPortrait} from 'src/hooks'
import {useTypedDispatch} from 'src/store'
import {setIsAuthenticated} from 'src/store/profileSlice'
import {
  useCreateUserAndSendCodeMutation,
  useLoginMutation,
  useVerifyUserCodeMutation,
} from 'src/store/shopApi'
import {Color} from 'src/themes'
import {RESEND_SMS_TIMEOUT_SECONDS} from 'src/variables'

import {LoginForm, LoginFormType} from './LoginForm'
import {RegistryForm, RegistryFormType} from './RegistryForm'

import {Button} from '../ui/Button'
import {Header} from '../ui/Header'
import {InfoLightIcon} from '../ui/icons/common'
import {KeyboardSafeArea} from '../ui/KeyboardSafeArea'
import {OTPTextInput} from '../ui/OTPTextInput'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'
import {ViewToggler} from '../ui/ViewToggler'

interface HomeAuthProps {
  onPressHelp?: () => void
}

export const HomeAuth = ({onPressHelp}: HomeAuthProps) => {
  const [authOption, setAuthOption] = useState(options[0].value)
  const [showSmsConfirmModal, setShowSmsConfirmModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [requestError, setRequestError] = useState('')

  const otpModalRef = useRef<any>(null)
  const [createUserSendCode] = useCreateUserAndSendCodeMutation()
  const [verifyCode] = useVerifyUserCodeMutation()
  const [login] = useLoginMutation()

  const dispatch = useTypedDispatch()

  const sendVerifySms = useCallback(
    (telephone: string) => () => {
      createUserSendCode({telephone})
      otpModalRef.current?.resetTimer?.()
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
        }
      } catch (error) {
        captureException(error)
      }
      setShowSmsConfirmModal(true)
      setShowModal(true)
      // На всякий случай
      setTimeout(() => {
        otpModalRef.current?.setPhoneNumber?.(formData.telephone)
      }, 300)
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
        return
      }
      dispatch(setIsAuthenticated(true))
    } catch (error) {
      captureException(error)
    }
  }, [])

  const onCloseModal = useCallback(() => {
    setShowSmsConfirmModal(false)
    setTimeout(() => setShowModal(false), 600)
  }, [])

  const onRegistryCheckOtp = useCallback(
    async (code: string, telephone: string) => {
      const res: any = await verifyCode({code, telephone})
      if (res?.data?.failed) {
        otpModalRef.current?.setError(res.data.failed)
      } else if (res.data.success) {
        dispatch(setIsAuthenticated(true))
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
      {showModal && (
        <Modal transparent>
          {showSmsConfirmModal && (
            <OTPModal
              ref={otpModalRef}
              sendVerifySms={sendVerifySms}
              onSubmit={onRegistryCheckOtp}
              onCloseModal={onCloseModal}
            />
          )}
        </Modal>
      )}
    </KeyboardSafeArea>
  )
}

interface OTPModalProps {
  onCloseModal?: () => void
  sendVerifySms?: (phone: string) => () => void
  onSubmit?: (code: string, phone: string) => void
}

const OTPModal = memo(
  forwardRef(({onCloseModal, sendVerifySms, onSubmit}: OTPModalProps, ref) => {
    const [otpCode, setOtpCode] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')

    const timerRef = useRef<any>(null)
    useScreenBlockPortrait()

    useImperativeHandle(ref, () => ({
      setPhoneNumber(phoneNum: string) {
        setPhone(phoneNum)
        timerRef.current?.resetTimer?.(RESEND_SMS_TIMEOUT_SECONDS)
      },
      resetTimer() {
        timerRef.current?.resetTimer?.(RESEND_SMS_TIMEOUT_SECONDS)
      },
      setError,
    }))

    return (
      <>
        <Animated.View
          entering={FadeIn.duration(300)}
          exiting={FadeOut.delay(300)}
          style={styles.modalContainer}
        />
        <Animated.View
          entering={modalEntering.delay(300).duration(300)}
          exiting={modalExiting.duration(300)}
          style={styles.modalPopup}>
          <View style={styles.modalPopupContainer}>
            <Header
              onPressBack={onCloseModal}
              title="Введите код из вызова"
              showBack
              hideBasket
              hideSearch
              withoutSafeAreaTop
            />
            <OTPTextInput
              handleTextChange={(code: string) => {
                setOtpCode(code)
              }}
            />
            <Spacer height={16} />
            {error && (
              <>
                <Text gp1 center color={Color.textRed1}>
                  {error}
                </Text>
                <Spacer height={16} />
              </>
            )}
            <Button gp5 onPress={() => onSubmit?.(otpCode, phone)}>
              Подтвердить
            </Button>
            <Spacer height={16} />
            <Text center style={styles.text}>
              <Text gp1>
                Мы направили телефонный звонок с кодом подтверждения на номер{' '}
              </Text>
              <Text gp6>{phone}</Text>
            </Text>
            <Spacer height={8} />
            <ResendTimer onResend={sendVerifySms?.(phone)} ref={timerRef} />
          </View>
        </Animated.View>
      </>
    )
  }),
)

const ResendTimer = forwardRef(({onResend}: {onResend?: () => void}, ref) => {
  const [seconds, setSeconds] = useState(0)
  const intervalId = useRef<number>(0)

  useImperativeHandle(ref, () => ({
    resetTimer(secondsAmount: number) {
      clearInterval(intervalId.current)
      setSeconds(secondsAmount)

      intervalId.current = setInterval(() => {
        setSeconds(pr => {
          if (pr <= 1) {
            clearInterval(intervalId.current)
            return pr - 1
          } else {
            return pr - 1
          }
        })
      }, 1000)
    },
  }))

  return seconds > 0 ? (
    <Text center style={styles.text}>
      <Text gp1>Запросить повторный звонок можно будет через </Text>
      <Text gp6>{formatSecondsTimer(seconds)}</Text>
    </Text>
  ) : (
    <TouchableOpacity onPress={onResend}>
      <Text center color={Color.primary} gp1 style={styles.text}>
        Получить новый код
      </Text>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  modalPopup: {
    position: 'absolute',
    alignSelf: 'center',
    top: 130,
    width: '100%',
    padding: 18,
    zIndex: 2,
  },
  modalPopupContainer: {
    backgroundColor: Color.bg,
    borderRadius: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Color.darkOpacity,
  },
  text: {
    lineHeight: 18,
    maxWidth: 270,
    alignSelf: 'center',
  },
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

const modalEntering = new Keyframe({
  0: {
    transform: [{scale: 0.6}, {translateY: -50}],
    opacity: 0,
  },
  100: {
    transform: [{scale: 1}, {translateY: 0}],
    opacity: 1,
  },
})
const modalExiting = new Keyframe({
  0: {
    transform: [{scale: 1}, {translateY: 0}],
    opacity: 1,
  },
  100: {
    transform: [{scale: 0.6}, {translateY: -50}],
    opacity: 0,
  },
})
