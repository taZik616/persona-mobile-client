import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native'
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated'
import {Keyframe} from 'react-native-reanimated'

import {formatSecondsTimer} from 'src/helpers'
import {Color} from 'src/themes'
import {RESEND_SMS_TIMEOUT_SECONDS} from 'src/variables'

import {Button} from 'ui/Button'
import {Header} from 'ui/Header'
import {Spacer} from 'ui/Spacer'
import {Text} from 'ui/Text'

import {OTPTextInput} from './TextInput'

interface OTPModalProps {
  onCloseModal?: () => void
  sendVerifySms?: (phone: string) => () => void
  onSubmit?: (code: string, phone: string) => void
}

export interface OTPModalRefType {
  setPhoneNumber: (phoneNum: string) => void
  setTextInfo: (text: string | undefined) => void
  resetTimer: () => void
  setError: (error: string) => void
  openModal: () => void
  closeModal: () => void
  setTimer: (seconds: number) => void
}

export const OTPModal = memo(
  forwardRef<OTPModalRefType, OTPModalProps>(
    ({onCloseModal, sendVerifySms, onSubmit}, ref) => {
      const [otpCode, setOtpCode] = useState('')
      const [phone, setPhone] = useState('')
      const [textInfo, setTextInfo] = useState<string | undefined>(undefined)
      const [error, setError] = useState('')

      const [showSmsConfirmModal, setShowSmsConfirmModal] = useState(false)
      const [showModal, setShowModal] = useState(false)

      const timerRef = useRef<any>(null)

      useImperativeHandle(ref, () => ({
        setPhoneNumber(phoneNum) {
          setPhone(phoneNum)
          timerRef.current?.resetTimer?.(RESEND_SMS_TIMEOUT_SECONDS)
        },
        resetTimer() {
          timerRef.current?.resetTimer?.(RESEND_SMS_TIMEOUT_SECONDS)
        },
        setTimer(seconds) {
          timerRef.current?.resetTimer?.(seconds)
        },
        setError,
        setTextInfo(text) {
          setTextInfo(text)
          timerRef.current?.resetTimer?.(RESEND_SMS_TIMEOUT_SECONDS)
        },

        openModal: () => {
          setShowSmsConfirmModal(true)
          setShowModal(true)
        },
        closeModal: () => {
          setTimeout(() => setError(''), 300)
          setShowSmsConfirmModal(false)
          setTimeout(() => setShowModal(false), 600)
        },
      }))

      return showModal ? (
        <Modal transparent>
          {showSmsConfirmModal && (
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
                  {textInfo ? (
                    <Text center gp1 style={styles.text}>
                      {textInfo}
                    </Text>
                  ) : (
                    <Text center style={styles.text}>
                      <Text gp1>
                        Мы направили телефонный звонок с кодом подтверждения на
                        номер{' '}
                      </Text>
                      <Text gp6>{phone}</Text>
                    </Text>
                  )}
                  <Spacer height={8} />
                  <ResendTimer
                    onResend={sendVerifySms?.(phone)}
                    ref={timerRef}
                  />
                </View>
              </Animated.View>
            </>
          )}
        </Modal>
      ) : (
        <></>
      )
    },
  ),
)

const ResendTimer = memo(
  forwardRef(({onResend}: {onResend?: () => void}, ref) => {
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
  }),
)

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
