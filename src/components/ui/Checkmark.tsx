import React, {useState} from 'react'

import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native'
import Svg, {Circle, G, Path, SvgProps} from 'react-native-svg'

import {Color} from 'src/themes'

export type CheckmarkProps = {
  defaultValue?: boolean
  style?: StyleProp<ViewStyle>
  onChange?: (isSelected: boolean) => void
}

export const Checkmark = ({
  defaultValue = false,
  onChange,
  style,
}: CheckmarkProps) => {
  const [isFilled, setIsFilled] = useState(defaultValue)

  const onToggle = () => {
    setIsFilled(pr => {
      onChange?.(!pr)
      return !pr
    })
  }

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onToggle}>
      {isFilled ? <CheckboxFilled /> : <CheckboxEmpty />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
})

const CheckboxEmpty = ({color = Color.switchBg, ...props}: SvgProps) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 28 28" fill="none" {...props}>
      <G clipPath="url(#a)" fill={color}>
        <Path d="M14 .438c7.492 0 13.563 6.07 13.563 13.562 0 7.492-6.07 13.563-13.563 13.563C6.508 27.563.437 21.492.437 14 .438 6.508 6.508.437 14 .437Zm0 24.5c6.043 0 10.938-4.895 10.938-10.938 0-6.043-4.895-10.938-10.938-10.938C7.957 3.063 3.062 7.957 3.062 14c0 6.043 4.895 10.938 10.938 10.938Z" />
        <Path d="M14 1.077c7.139 0 12.923 5.784 12.923 12.923S21.139 26.923 14 26.923C6.86 26.923 1.077 21.14 1.077 14S6.86 1.077 14 1.077Zm0 23.345A10.419 10.419 0 0 0 24.422 14 10.419 10.419 0 0 0 14 3.578 10.419 10.419 0 0 0 3.578 14 10.419 10.419 0 0 0 14 24.422Z" />
      </G>
    </Svg>
  )
}

const CheckboxFilled = ({color = Color.primary, ...props}: SvgProps) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Circle cx={12} cy={12} r={12} fill={color} />
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m17 9-6.188 6.75L8 12.682"
      />
    </Svg>
  )
}
