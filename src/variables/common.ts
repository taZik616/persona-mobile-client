import {Dimensions, Platform} from 'react-native'
import {Easing} from 'react-native-reanimated'

export const IS_ANDROID = Platform.OS === 'android'
export const IS_IOS = Platform.OS === 'ios'

export const DEFAULT_HITSLOP = {top: 10, bottom: 10, left: 10, right: 10}
export const {width: SCREEN_W, height: SCREEN_H} = Dimensions.get('window')

export const ANIMATION_DURATION = 300
export const ANIMATION_TYPE = Easing.bezierFn(0.42, 0, 0.58, 0)

export const NUM_PRECISION = 1

export const PHONE_VALIDATION_REGEXP =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
export const CARD_ASPECT_RATIO = 1.68

export const RESEND_SMS_TIMEOUT_SECONDS = 60 * 6
