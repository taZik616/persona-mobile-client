import React from 'react'

import Svg, {Path, SvgProps} from 'react-native-svg'

import {Color} from 'src/themes'

export function BackArrowIcon({
  color = Color.primaryBlack,
  ...props
}: SvgProps) {
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
