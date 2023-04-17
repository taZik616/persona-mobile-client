import React, {useRef, useState} from 'react'

import ImagePicker from 'react-native-image-crop-picker'
import {recognizeTextFromLocalImage} from 'react-native-text-recognizer'

import {LoyaltyCardAdd} from 'src/components/LoyaltyCardAdd'
import {ActionsSheet} from 'src/components/ui/ActionsSheet'
import {captureException} from 'src/helpers'
import {findCardNumberInArray} from 'src/helpers/findCardNumberInArray'
import {useTypedNavigation} from 'src/hooks'
import {
  useCameraPermissions,
  useGalleryPermissions,
} from 'src/hooks/usePermissions'
import {imagePickerCardConfig} from 'src/variables'

export const LoyaltyCardAddScreen = () => {
  const {goBack} = useTypedNavigation()

  const {isAllowed: isAllowedCamera, requestCameraPermission} =
    useCameraPermissions()
  const {isAllowed: isAllowedGallery, requestGalleryPermission} =
    useGalleryPermissions()

  const [isOpenAS, setIsOpenAS] = useState(false)
  const componentRef = useRef<any>(null)

  const handleRecognize = async (localImgPath: string) => {
    const res = await recognizeTextFromLocalImage(localImgPath)

    const cardNumber = findCardNumberInArray(res)
    if (cardNumber) {
      componentRef.current?.setValue?.(cardNumber)
      componentRef.current?.setWarning?.(
        'Проверьте верность распознанного номера карты.',
      )
    } else {
      componentRef.current?.setError?.('Не удалось распознать номер карты.')
    }
  }

  const onPressScanCard = () => {
    setIsOpenAS(true)
  }

  const takePhoto = async () => {
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
  }

  const choicePhoto = async () => {
    setIsOpenAS(false)
    const canChoicePhoto = isAllowedGallery
      ? true
      : await requestGalleryPermission()

    if (canChoicePhoto) {
      const img = await ImagePicker.openPicker(imagePickerCardConfig)
      handleRecognize(img.path)
    }
  }

  const onCancel = () => {
    setIsOpenAS(false)
  }

  return (
    <>
      <LoyaltyCardAdd
        ref={componentRef}
        onPressScanCard={onPressScanCard}
        onPressBack={goBack}
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
    </>
  )
}
