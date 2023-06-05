import {Dimensions, Platform} from 'react-native'
import {Easing, WithSpringConfig} from 'react-native-reanimated'

import {Color} from 'src/themes'

export const IS_ANDROID = Platform.OS === 'android'
export const IS_IOS = Platform.OS === 'ios'

export const DEFAULT_HITSLOP = {top: 10, bottom: 10, left: 10, right: 10}
export const {width: SCREEN_W, height: SCREEN_H} = Dimensions.get('window')

export const SPRING_ANIM_CONF: WithSpringConfig = {
  damping: 20,
  mass: 1,
  stiffness: 175,
  overshootClamping: true,
  restSpeedThreshold: 0.3,
  restDisplacementThreshold: 0.1,
}
export const NUM_PRECISION = 1

export const CARD_ASPECT_RATIO = 1.68
export const CARD_BORDER_RADIUS = 32
export const RESEND_SMS_TIMEOUT_SECONDS = 60 * 6

export const imagePickerCardConfig = {
  freeStyleCropEnabled: true,
  cropping: true,
  enableRotationGesture: true,
  cropperStatusBarColor: Color.border,
  cropperToolbarColor: Color.bg,
  cropperActiveWidgetColor: Color.primary,
  cropperToolbarWidgetColor: Color.primary,
}

export const YEAR_IN_MS = 365 * 24 * 60 * 60 * 1000

export const UNKNOWN_ERROR_MSG =
  'Неизвестная ошибка. Проверьте подключение к интернету'

export const SKELETON_ANIM_CONF = {
  duration: 1000,
  easing: Easing.in(Easing.quad),
}
