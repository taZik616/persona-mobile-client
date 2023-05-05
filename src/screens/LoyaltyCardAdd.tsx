import React, {useCallback, useRef, useState} from 'react'

import ImagePicker from 'react-native-image-crop-picker'
import {recognizeTextFromLocalImage} from 'react-native-text-recognizer'

import {LoyaltyCardAdd} from 'src/components/LoyaltyCardAdd'
import {ActionsSheet} from 'src/components/ui/ActionsSheet'
import {OTPModal, OTPModalRefType} from 'src/components/ui/OTPModal'
import {captureException} from 'src/helpers'
import {findCardNumberInArray} from 'src/helpers/findCardNumberInArray'
import {
  useCameraPermissions,
  useGalleryPermissions,
} from 'src/hooks/usePermissions'
import {vibration} from 'src/services/vibration'
import {imagePickerCardConfig} from 'src/variables'

export const LoyaltyCardAddScreen = () => {
  const {isAllowed: isAllowedCamera, requestCameraPermission} =
    useCameraPermissions()
  const {isAllowed: isAllowedGallery, requestGalleryPermission} =
    useGalleryPermissions()
  const otpModalRef = useRef<OTPModalRefType>(null)

  const [isOpenAS, setIsOpenAS] = useState(false)
  const componentRef = useRef<any>(null)
  // const [loyaltyCodeSend] = useLoyaltyCodeSendMutation()
  // const [loyaltyCodeValidate] = useLoyaltyCodeValidateMutation()

  const handleRecognize = useCallback(async (localImgPath: string) => {
    const res = await recognizeTextFromLocalImage(localImgPath)

    const cardNumber = findCardNumberInArray(res)
    if (cardNumber) {
      vibration.soft()
      componentRef.current?.setValue?.(cardNumber)
      componentRef.current?.setWarning?.(
        'Проверьте верность распознанного номера карты.',
      )
    } else {
      vibration.error()
      componentRef.current?.setError?.('Не удалось распознать номер карты.')
    }
  }, [])

  const onPressScanCard = useCallback(() => {
    vibration.light()
    setIsOpenAS(true)
  }, [])

  const takePhoto = useCallback(async () => {
    try {
      setIsOpenAS(false)

      const canTakePhoto = isAllowedCamera
        ? true
        : await requestCameraPermission()
      if (canTakePhoto) {
        const img = await ImagePicker.openCamera(imagePickerCardConfig)
        handleRecognize(img.path)
      }
    } catch (error) {
      captureException(error)
    }
  }, [isAllowedCamera, requestCameraPermission, handleRecognize])

  const choicePhoto = useCallback(async () => {
    setIsOpenAS(false)
    const canChoicePhoto = isAllowedGallery
      ? true
      : await requestGalleryPermission()

    if (canChoicePhoto) {
      const img = await ImagePicker.openPicker(imagePickerCardConfig)
      handleRecognize(img.path)
    }
  }, [isAllowedGallery, requestGalleryPermission, handleRecognize])

  const onCancel = useCallback(() => {
    setIsOpenAS(false)
  }, [])

  const sendVerifySms = useCallback(
    () => () => {
      vibration.rigid()
      // loyaltyCodeSend({userPhone:telephone})// Тут вообще не должен быть телефон
      otpModalRef.current?.resetTimer()
    },
    [],
  )

  const onVerify = useCallback(() => {
    otpModalRef.current?.openModal()
    sendVerifySms()
    setTimeout(() => {
      otpModalRef.current?.setTextInfo(
        'На номер владельца данной карты лояльности отправлен вызов с кодом подтверждения',
      )
    }, 300)
  }, [sendVerifySms])

  const onCloseModal = useCallback(() => {
    otpModalRef.current?.closeModal()
  }, [])

  const onCheckOtp = useCallback(() => {
    // loyaltyCodeValidate
  }, [])

  return (
    <>
      <LoyaltyCardAdd
        ref={componentRef}
        onNext={onVerify}
        onPressScanCard={onPressScanCard}
      />
      {isOpenAS && (
        <ActionsSheet
          firstOpt="Сделать фотографию"
          secondOpt="Выбрать из галереи"
          onCancel={onCancel}
          onPressFirstOpt={takePhoto}
          onPressSecondOpt={choicePhoto}
        />
      )}
      <OTPModal
        sendVerifySms={sendVerifySms}
        onSubmit={onCheckOtp}
        onCloseModal={onCloseModal}
        ref={otpModalRef}
      />
    </>
  )
}
