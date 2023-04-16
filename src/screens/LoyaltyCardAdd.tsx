import React, {useState} from 'react'

import ImagePicker from 'react-native-image-crop-picker'

import {LoyaltyCardAdd} from 'src/components/LoyaltyCardAdd'
import {ActionsSheet} from 'src/components/ui/ActionsSheet'
import {captureException} from 'src/helpers'
import {useTypedNavigation} from 'src/hooks'
import {
  useCameraPermissions,
  useGalleryPermissions,
} from 'src/hooks/usePermissions'
import {Color} from 'src/themes'
import {CARD_ASPECT_RATIO} from 'src/variables'

const imagePickerConfig = {
  width: 1000,
  height: 1000 / CARD_ASPECT_RATIO,
  cropping: true,
  enableRotationGesture: true,
  cropperStatusBarColor: Color.border,
  cropperToolbarColor: Color.bg,
  cropperActiveWidgetColor: Color.primary,
  cropperToolbarWidgetColor: Color.primary,
}

export const LoyaltyCardAddScreen = () => {
  const {goBack} = useTypedNavigation()
  const [isOpenAS, setIsOpenAS] = useState(false)
  const {isAllowed: isAllowedCamera, requestCameraPermission} =
    useCameraPermissions()
  const {isAllowed: isAllowedGallery, requestGalleryPermission} =
    useGalleryPermissions()

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
        const img = await ImagePicker.openCamera(imagePickerConfig)
        console.log('🚀 - img:', img)
        //const result = await TextRecognition.recognize(img.path)
        //console.log('🚀 - img:', result)
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
      const img = await ImagePicker.openPicker(imagePickerConfig)
      //const result = await TextRecognition.recognize(img.path)
      //console.log('🚀 - img:', result)
    }
  }

  const onCancel = () => {
    setIsOpenAS(false)
  }

  return (
    <>
      <LoyaltyCardAdd onPressScanCard={onPressScanCard} onPressBack={goBack} />
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
