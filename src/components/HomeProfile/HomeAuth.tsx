import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
// @ts-ignore
import OTPTextInput from 'react-native-otp-textinput'
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated'
import {Keyframe} from 'react-native-reanimated'

import {formatSecondsTimer} from 'src/helpers'
import {useScreenBlockPortrait} from 'src/hooks'
import {Color} from 'src/themes'

import {LoginForm, LoginFormType} from './LoginForm'
import {RegistryForm, RegistryFormType} from './RegistryForm'

import {Button} from '../ui/Button'
import {Header} from '../ui/Header'
import {KeyboardSafeArea} from '../ui/KeyboardSafeArea'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'
import {ViewToggler} from '../ui/ViewToggler'

export const HomeAuth = () => {
  const [authOption, setAuthOption] = useState(options[0].value)
  const [showSmsConfirmModal, setShowSmsConfirmModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const otpModalRef = useRef<any>(null)

  const sendVerifySms = useCallback(
    (phoneNumber: string) => () => {
      console.log('🚀 - sendVerifySms, phoneNumber:', phoneNumber)
      otpModalRef.current?.resetTimer?.()
    },
    [],
  )

  const onRegistryStartVerification = useCallback(
    (formData: RegistryFormType) => {
      setShowSmsConfirmModal(true)
      setShowModal(true)
      sendVerifySms(formData.telephone)()
      // На всякий случай
      setTimeout(() => {
        otpModalRef.current?.setPhoneNumber?.(formData.telephone)
      }, 300)
    },
    [],
  )

  const onRegistryCheckOtp = useCallback((otpCode: string) => {
    console.log('🚀 - otpCode:', otpCode)
  }, [])

  const onLogin = useCallback((formData: LoginFormType) => {
    console.log('🚀 - formData:', formData)
  }, [])

  const onCloseModal = useCallback(() => {
    setShowSmsConfirmModal(false)
    setTimeout(() => setShowModal(false), 1000)
  }, [])

  return (
    <KeyboardSafeArea>
      <ScrollView>
        <Spacer height={40} />
        <ViewToggler onEndToggle={setAuthOption} options={options} />
        <Spacer height={36} />
        <SafeLandscapeView center safeArea>
          {authOption === 'registry' ? (
            <RegistryForm onSubmit={onRegistryStartVerification} />
          ) : (
            <LoginForm onSubmit={onLogin} />
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
  onSubmit?: (code: string) => void
}

const OTPModal = memo(
  forwardRef(({onCloseModal, sendVerifySms, onSubmit}: OTPModalProps, ref) => {
    const [otpCode, setOtpCode] = useState('')
    const [phone, setPhone] = useState('')
    const timerRef = useRef<any>(null)
    useScreenBlockPortrait()

    useImperativeHandle(ref, () => ({
      setPhoneNumber(phoneNum: string) {
        setPhone(phoneNum)
        timerRef.current?.resetTimer?.(60)
      },
      resetTimer() {
        timerRef.current?.resetTimer?.(60)
      },
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
              title="Введите код из СМС"
              showBack
              hideBasket
              hideSearch
              withoutSafeAreaTop
            />
            <View style={styles.otpContainer}>
              <OTPTextInput
                textInputStyle={styles.otpInputContainerStyle}
                tintColor={Color.primary}
                handleTextChange={(code: string) => {
                  setOtpCode(code)
                }}
              />
            </View>
            <Spacer height={16} />
            <Button gp5 onPress={() => onSubmit?.(otpCode)}>
              Подтвердить
            </Button>
            <Spacer height={16} />
            <Text center style={styles.text}>
              <Text gp1>Мы отправили SMS с кодом подтверждения на номер </Text>
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
      <Text gp1>Повторить отправку кода можно через </Text>
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
  otpContainer: {
    borderWidth: 1,
    borderColor: Color.secondaryGray,
    borderRadius: 8,
    padding: 16,
  },
  otpInputContainerStyle: {
    backgroundColor: Color.secondaryGray,
    borderRadius: 8,
    borderBottomWidth: 0,
    flex: 1,
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
