import {trigger} from 'react-native-haptic-feedback'

import {IS_IOS} from 'src/variables'

export const vibration = {
  selection: () => trigger(IS_IOS ? 'selection' : 'impactLight'),
  success: () => trigger('notificationSuccess'),
  warning: () => trigger('notificationWarning'),
  error: () => trigger('notificationError'),
  light: () => trigger('impactLight'),
  soft: () => trigger('soft'),
  rigid: () => trigger('rigid'),
  effectTick: () => trigger('effectTick'),
  clockTick: () => trigger('clockTick'),
}
