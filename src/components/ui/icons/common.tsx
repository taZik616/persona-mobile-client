import React from 'react'

import Svg, {Circle, G, Path, Rect, SvgProps} from 'react-native-svg'

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

export const PaymentIcon = ({
  color = Color.primaryBlack,
  ...props
}: SvgProps) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        stroke={color}
        d="M14.166 7.5V6.167a2 2 0 0 0-2-2H2.833a2 2 0 0 0-2 2V10.5a2 2 0 0 0 2 2h2.881"
      />
      <Rect
        width={13.333}
        height={8.333}
        x={5.833}
        y={7.5}
        stroke={color}
        rx={2}
      />
      <Circle cx={12.5} cy={11.667} r={1.667} stroke={color} />
    </Svg>
  )
}

export const DeliveryIcon = ({
  color = Color.primaryBlack,
  ...props
}: SvgProps) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M.833 2.5H12.5v10.833H.833zM12.5 6.667h3.333L19.167 10v3.333H12.5V6.667Z"
      />
      <Circle
        cx={4.583}
        cy={15.417}
        r={2.083}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={14.583}
        cy={15.417}
        r={2.083}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export const ExchangeIcon = ({
  color = Color.primaryBlack,
  ...props
}: SvgProps) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.377 7.84a7.833 7.833 0 0 1 14.89-.52M18.124 13.045a7.834 7.834 0 0 1-14.317.265"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m5.762 12.446-2.14.317-1.03 1.902M16.111 8.108l2.14-.317 1.03-1.902"
      />
    </Svg>
  )
}

export const SellConditionIcon = ({
  color = Color.primaryBlack,
  ...props
}: SvgProps) => {
  return (
    <Svg viewBox="0 0 20 20" width={20} height={20} fill="none" {...props}>
      <Path
        stroke={color}
        d="M3 3.833a2.5 2.5 0 0 1 2.5-2.5h1.684a3.5 3.5 0 0 1 3.5 3.5V6a2 2 0 0 0 2 2h.816a3.5 3.5 0 0 1 3.5 3.5v4.667a2.5 2.5 0 0 1-2.5 2.5h-9a2.5 2.5 0 0 1-2.5-2.5V3.833Z"
      />
      <Path
        stroke={color}
        d="M3 3.833a2.5 2.5 0 0 1 2.5-2.5h1.497A8.5 8.5 0 0 1 13.5 4.358l1.503 1.785A8.5 8.5 0 0 1 17 11.618v4.549a2.5 2.5 0 0 1-2.5 2.5h-9a2.5 2.5 0 0 1-2.5-2.5V3.833Z"
      />
    </Svg>
  )
}

export const PrivacyPolicyIcon = ({
  color = Color.primaryBlack,
  ...props
}: SvgProps) => {
  return (
    <Svg viewBox="0 0 20 20" width={20} height={20} fill="none" {...props}>
      <G stroke={color} clipPath="url(#a)">
        <Path d="M8.085 2.328a2.48 2.48 0 0 1 3.83 0 2.48 2.48 0 0 0 2.156.892 2.48 2.48 0 0 1 2.709 2.71 2.48 2.48 0 0 0 .892 2.155 2.48 2.48 0 0 1 0 3.83 2.48 2.48 0 0 0-.892 2.156 2.48 2.48 0 0 1-2.71 2.709 2.48 2.48 0 0 0-2.155.892 2.48 2.48 0 0 1-3.83 0 2.48 2.48 0 0 0-2.156-.892 2.48 2.48 0 0 1-2.709-2.71 2.48 2.48 0 0 0-.892-2.155 2.48 2.48 0 0 1 0-3.83 2.48 2.48 0 0 0 .892-2.156A2.48 2.48 0 0 1 5.93 3.22a2.48 2.48 0 0 0 2.155-.892Z" />
        <Path strokeLinecap="round" d="m7.5 9.958 1.768 1.768 3.535-3.536" />
      </G>
    </Svg>
  )
}

export const ContactsIcon = ({
  color = Color.primaryBlack,
  ...props
}: SvgProps) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.616 1.669 2.407.267c.93.104 1.646.843 1.525 1.77-.262 2.008-1.31 5.675-5.238 9.603-3.928 3.928-7.595 4.976-9.603 5.239-.928.12-1.667-.595-1.77-1.525l-.268-2.407a2 2 0 0 1 .996-1.958l1.659-.947a2 2 0 0 1 2.406.322l.225.225c.473.473 1.155.673 1.751.37.586-.298 1.381-.81 2.247-1.676.865-.865 1.378-1.66 1.675-2.246.303-.596.103-1.279-.37-1.751l-.225-.225a2 2 0 0 1-.322-2.407l.948-1.659a2 2 0 0 1 1.957-.995Z"
      />
    </Svg>
  )
}

export const ChevronRightIcon = ({
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
        d="m10 5 6.963 6.963L10 18.926"
      />
    </Svg>
  )
}

export const SuccessIcon = ({color = Color.primary, ...props}: SvgProps) => {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Circle cx={9} cy={9} r={8.25} stroke={color} />
      <Path
        stroke={color}
        strokeLinecap="round"
        d="m6.75 8.962 1.591 1.591 3.182-3.182"
      />
    </Svg>
  )
}

export const ProgressIcon = ({
  color = Color.primaryGray,
  ...props
}: SvgProps) => {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Circle cx={9} cy={9} r={8.25} stroke={color} />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5.25v4.5l1.875 1.875"
      />
    </Svg>
  )
}

export const RejectedIcon = ({color = Color.textRed1, ...props}: SvgProps) => {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Circle cx={9} cy={9} r={8.25} stroke={color} />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m6.75 6.75 4.5 4.5M6.75 11.25l4.5-4.5"
      />
    </Svg>
  )
}

export const FavoritesEmptyIcon = ({
  color = Color.primaryGray,
  ...props
}: SvgProps) => {
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
      <Path
        fill={color}
        fillRule="evenodd"
        d="M5.827 7.994a9.084 9.084 0 0 1 12.847 0l.765.765a1.5 1.5 0 0 0 2.121 0l.765-.765A9.084 9.084 0 0 1 35.172 20.84l-1.027 1.027c.579.35 1.115.762 1.6 1.229l.841-.842c4.329-4.329 4.329-11.347 0-15.675-4.328-4.329-11.346-4.329-15.675 0l-.412.411-.411-.411c-4.329-4.33-11.347-4.33-15.676 0-4.328 4.328-4.328 11.346 0 15.675L19.688 37.53a1 1 0 0 0 .812.287 1.004 1.004 0 0 0 .813-.287l1.707-1.707a9.032 9.032 0 0 1-1.23-1.6l-1.29 1.29L5.828 20.841a9.084 9.084 0 0 1 0-12.847Z"
        clipRule="evenodd"
      />
      <Circle cx={29.5} cy={29.578} r={8.25} stroke={color} strokeWidth={1.5} />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m26.5 26.578 6.387 6.387M26.5 32.965l6.387-6.387"
      />
    </Svg>
  )
}

export const BasketEmptyIcon = ({
  color = Color.primaryGray,
  ...props
}: SvgProps) => {
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
      <Path
        fill={color}
        fillRule="evenodd"
        d="M9.922.145c-.829 0-1.615.369-2.145 1.005L3.595 6.168a2.792 2.792 0 0 0-.647 1.788v24.458a3.723 3.723 0 0 0 3.723 3.724h17.08a8.341 8.341 0 0 1-.94-1.862H6.67a1.862 1.862 0 0 1-1.862-1.862V8.988h29.167v14.768a8.37 8.37 0 0 1 1.861 1.097V7.956c0-.653-.229-1.286-.647-1.788L31.01 1.15A2.793 2.793 0 0 0 28.863.145H9.922Zm-.715 2.197a.93.93 0 0 1 .715-.335h18.941a.93.93 0 0 1 .715.335l3.988 4.785H5.22l3.987-4.785Zm4.91 12.697a.93.93 0 0 0-1.86 0 7.136 7.136 0 0 0 14.272 0 .93.93 0 0 0-1.862 0 5.275 5.275 0 0 1-10.55 0Z"
        clipRule="evenodd"
      />
      <Circle
        cx={30.698}
        cy={31.463}
        r={7.674}
        stroke={color}
        strokeWidth={1.396}
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.396}
        d="m27.925 28.69 5.946 5.946M27.925 34.636l5.946-5.945"
      />
    </Svg>
  )
}

export const HangerIcon = ({
  color = Color.primaryBlack,
  ...props
}: SvgProps) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <G stroke={color} strokeWidth={2} clipPath="url(#a)">
        <Path d="M2.201 21c-.98 0-1.375-1.264-.569-1.822l9.23-6.39a2 2 0 0 1 2.276 0l9.23 6.39c.806.558.411 1.822-.57 1.822H2.202Z" />
        <Path
          strokeLinecap="round"
          d="M12 12v-1.882c0-.379.213-.724.535-.925C13.398 8.656 15 7.462 15 6c0-2-1.475-3-3-3S9 4.5 9 6v.25"
        />
      </G>
    </Svg>
  )
}

export const SortIcon = ({color = Color.primaryGray, ...props}: SvgProps) => {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 15.75V2.25l-4.5 4.5M12 2.25v13.5l4.5-4.5"
      />
    </Svg>
  )
}

export const CheckIcon = ({color = Color.primaryBlack, ...props}: SvgProps) => {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeWidth={2}
        d="M3.259 9.735 7.5 13.978l8.486-8.485"
      />
    </Svg>
  )
}
