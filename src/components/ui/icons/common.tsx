import React from 'react'

import Svg, {Path, SvgProps} from 'react-native-svg'

import {Color} from 'src/themes'

export const BackArrowIcon = ({
  color = Color.primaryBlack,
  ...props
}: SvgProps) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.717 5 3 12l6.717 7"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeWidth={2}
        d="M4.268 12.032h13"
      />
    </Svg>
  )
}

export const StarEmptyIcon = ({
  color = Color.primaryGray,
  ...props
}: SvgProps) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={3.329}
        d="M11.308 2.658a.75.75 0 0 1 1.384 0l2.202 5.274a.75.75 0 0 0 .591.454l5.803.785a.75.75 0 0 1 .373 1.325l-4.48 3.656a.75.75 0 0 0-.257.75l1.433 6.19c.155.67-.599 1.178-1.162.783l-4.764-3.344a.75.75 0 0 0-.862 0l-4.764 3.344c-.563.395-1.317-.113-1.162-.783l1.432-6.19a.75.75 0 0 0-.256-.75l-4.48-3.656a.75.75 0 0 1 .373-1.325l5.803-.785a.75.75 0 0 0 .591-.454l2.202-5.274Z"
      />
    </Svg>
  )
}

export const StarFilledIcon = ({color = Color.primary, ...props}: SvgProps) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fill={color}
        fillRule="evenodd"
        d="M13.153 3.18c-.427-1.025-1.879-1.025-2.307 0L8.645 8.454a.25.25 0 0 1-.197.151l-5.803.786c-1.083.146-1.47 1.515-.622 2.207l4.48 3.656a.25.25 0 0 1 .085.25l-1.432 6.19c-.259 1.117.997 1.963 1.936 1.305l4.764-3.344a.25.25 0 0 1 .287 0l4.765 3.344c.938.658 2.194-.188 1.936-1.305l-1.433-6.19a.25.25 0 0 1 .086-.25l4.48-3.656c.847-.692.461-2.06-.622-2.207l-5.803-.786a.25.25 0 0 1-.197-.151L13.153 3.18Z"
        clipRule="evenodd"
      />
    </Svg>
  )
}

export const CrossIcon = ({color = Color.primaryBlack, ...props}: SvgProps) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m6 6 12.774 12.774M6 18.774 18.774 6"
      />
    </Svg>
  )
}

export const ShareIcon = ({color = Color.primaryBlack, ...props}: SvgProps) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m14.575 6.163-4.3-4.33-4.3 4.33"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeWidth={2}
        d="M10.107 2.75v8.833"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 11.533v3.334a5 5 0 0 0 5 5h4.167a5 5 0 0 0 5-5v-3.334"
      />
    </Svg>
  )
}

export const ShopBagLightIcon = ({color = Color.white, ...props}: SvgProps) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        stroke={color}
        d="M2.464 4.444A2 2 0 0 0 2 5.724V20a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5.724a2 2 0 0 0-.464-1.28l-2.27-2.724A2 2 0 0 0 17.73 1H6.27a2 2 0 0 0-1.536.72l-2.27 2.724ZM2 5.5h20"
      />
      <Path stroke={color} strokeLinecap="round" d="M16 10a4 4 0 0 1-8 0" />
    </Svg>
  )
}
