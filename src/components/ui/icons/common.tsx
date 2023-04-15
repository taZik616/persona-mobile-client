import React from 'react'

import Svg, {Circle, Path, SvgProps} from 'react-native-svg'

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
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
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

export const InfoIcon = ({color = Color.primaryBlack, ...props}: SvgProps) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Circle cx={10} cy={10} r={9.167} stroke={color} />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 5.833V10M10 13.334v.416"
      />
    </Svg>
  )
}

export const ProfileLightIcon = ({
  color = Color.primary,
  ...props
}: SvgProps) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.525 14.349C14.2 13.694 12.17 12.917 10 12.917c-2.17 0-4.2.777-5.525 1.432-1.025.506-1.635 1.539-1.77 2.674L2.5 18.75h15l-.205-1.727c-.135-1.135-.745-2.168-1.77-2.674ZM10 9.167a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
      />
    </Svg>
  )
}

export const CartLightIcon = ({color = Color.primary, ...props}: SvgProps) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        d="M.833 1.667h1.729a2 2 0 0 1 1.952 1.566L5 5.417m0 0 .77 4.24a6 6 0 0 0 5.904 4.926h.62a6 6 0 0 0 5.85-4.67l.606-2.664a1.5 1.5 0 0 0-1.463-1.832H5Z"
      />
      <Circle cx={7.083} cy={17.5} r={0.833} stroke={color} />
      <Circle cx={17.083} cy={17.5} r={0.833} stroke={color} />
    </Svg>
  )
}

export const MailLightIcon = ({color = Color.primary, ...props}: SvgProps) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        stroke={color}
        strokeLinejoin="round"
        d="M1 5.333a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8.75a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8.75Z"
      />
      <Path
        stroke={color}
        strokeLinejoin="round"
        d="M2.421 4.636c-.504-.462-.177-1.303.507-1.303h14.144c.684 0 1.01.841.507 1.303l-5.552 5.09a3 3 0 0 1-4.054 0L2.42 4.635Z"
      />
    </Svg>
  )
}

export const InfoLightIcon = ({color = Color.primary, ...props}: SvgProps) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Circle cx={10} cy={10} r={9.167} stroke={color} />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 5.833V10M10 13.333v.417"
      />
    </Svg>
  )
}

export const CameraIcon = ({
  color = Color.primaryBlack,
  ...props
}: SvgProps) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M1.667 7.714A2.714 2.714 0 0 1 4.381 5v0c.908 0 1.755-.454 2.258-1.209l.028-.041A2.807 2.807 0 0 1 9.003 2.5h1.995c.939 0 1.815.47 2.336 1.25l.027.041A2.714 2.714 0 0 0 15.62 5v0a2.714 2.714 0 0 1 2.715 2.714V13.5a4 4 0 0 1-4 4H5.667a4 4 0 0 1-4-4V7.714Z"
      />
      <Circle
        cx={10}
        cy={10.833}
        r={3.333}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
