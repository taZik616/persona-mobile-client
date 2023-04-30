import React from 'react'

import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native'

import {Color} from 'src/themes'

export type TextProps = Omit<RNTextProps, 'children'> & {
  cg1?: boolean
  cg2?: boolean
  cg3?: boolean
  cg4?: boolean
  gp1?: boolean
  gp6?: boolean
  gp2?: boolean
  gp3?: boolean
  gp4?: boolean
  gp5?: boolean
  maxWidth?: number
  lineHeight?: number
  center?: boolean
  right?: boolean
  color?: string
  children?: React.ReactNode
}

/**
 * @param cg1 - CormorantGaramond-SemiBold 15
 * @param cg2 - CormorantGaramond-SemiBold 20
 * @param cg3 - CormorantGaramond-Medium 15
 * @param cg4 - CormorantGaramond-SemiBold 13
 * @param gp1 - GothamPro 11
 * @param gp2 - GothamPro-Medium 15
 * @param gp3 - GothamPro-Medium 13
 * @param gp4 - GothamPro-Regular 13
 * @param gp5 - GothamPro-Regular 15
 * @param gp6 - GothamPro-Medium 11
 * @param h4 - Headline 18 Bold
 * @param p1 - Paragraph 14
 * @param p2 - Paragraph 12
 * @param l1 - Label 10 Bold
 * @param l2 - Label 12 Bold
 * @param bold - It makes the text bold
 * @param center - "textAlign: center"
 * @param right - "textAlign: right"
 * @param color - From enum Color
 * @param style - Additional style
 * @param children - Text
 */

export const Text = ({
  cg1,
  cg2,
  cg3,
  cg4,
  gp1,
  gp6,
  gp2,
  gp3,
  gp4,
  gp5,
  lineHeight,
  maxWidth,
  center,
  right,
  color = Color.textBase1,
  style,
  children,
  ...props
}: TextProps) => {
  return (
    <RNText
      allowFontScaling={false}
      testID="text"
      style={[
        cg1 && styles.cg1,
        cg2 && styles.cg2,
        cg3 && styles.cg3,
        cg4 && styles.cg4,
        gp1 && styles.gp1,
        gp6 && styles.gp6,
        gp2 && styles.gp2,
        gp3 && styles.gp3,
        gp4 && styles.gp4,
        gp5 && styles.gp5,
        style,
        {maxWidth, lineHeight, color},
        center && styles.center,
        right && styles.right,
      ]}
      {...props}>
      {children}
    </RNText>
  )
}

const styles = StyleSheet.create({
  cg1: {
    fontFamily: 'CormorantGaramond-SemiBold',
    fontSize: 15,
  },
  cg2: {
    fontFamily: 'CormorantGaramond-SemiBold',
    fontSize: 20,
  },
  cg3: {
    fontFamily: 'CormorantGaramond-Medium',
    fontSize: 15,
  },
  cg4: {
    fontFamily: 'CormorantGaramond-SemiBold',
    fontSize: 13,
  },
  gp1: {
    fontFamily: 'GothamPro',
    fontSize: 11,
    lineHeight: 18,
  },
  gp2: {
    fontFamily: 'GothamPro-Medium',
    fontSize: 15,
  },
  gp3: {
    fontFamily: 'GothamPro-Medium',
    fontSize: 13,
    lineHeight: 16,
  },
  gp4: {
    fontFamily: 'GothamPro',
    fontSize: 13,
    lineHeight: 18,
  },
  gp5: {
    fontFamily: 'GothamPro',
    fontSize: 15,
  },
  gp6: {
    fontFamily: 'GothamPro-Medium',
    fontSize: 11,
  },
  center: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  right: {
    textAlign: 'right',
  },
})
