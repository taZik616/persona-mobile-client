declare module '@env' {
  export const TELEPHONE_FAST_DEV_LOGIN: string | undefined
  export const PASSWORD_FAST_DEV_LOGIN: string | undefined
  export const APP_API_URL: string | undefined
}

declare module '*.svg' {
  import React from 'react'

  import {SvgProps} from 'react-native-svg'
  const content: React.FC<SvgProps>
  export default content
}
