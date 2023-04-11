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
  gp1?: boolean
  gp2?: boolean
  gp3?: boolean
  gp4?: boolean
  gp5?: boolean
  h4?: boolean
  p1?: boolean
  p2?: boolean
  l1?: boolean
  l2?: boolean
  bold?: boolean
  center?: boolean
  right?: boolean
  color?: string
  children?: React.ReactNode
}

/**
 * @param cg1 - CormorantGaramond-SemiBold 15
 * @param cg2 - CormorantGaramond-SemiBold 20
 * @param cg3 - CormorantGaramond-Medium 15
 * @param gp1 - GothamPro 11
 * @param gp2 - GothamPro 32
 * @param gp3 - GothamPro-Medium 13
 * @param gp4 - GothamPro-Regular 13
 * @param gp5 - GothamPro-Regular 15
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

export function Text({
  cg1,
  cg2,
  cg3,
  gp1,
  gp2,
  gp3,
  gp4,
  gp5,
  h4,
  p1,
  p2,
  l1,
  l2,
  bold,
  center,
  right,
  color = Color.textBase1,
  style,
  children,
  ...props
}: TextProps) {
  return (
    <RNText
      allowFontScaling={false}
      testID="text"
      style={[
        cg1 && styles.cg1,
        cg2 && styles.cg2,
        cg3 && styles.cg3,
        gp1 && styles.gp1,
        gp2 && styles.gp2,
        gp3 && styles.gp3,
        gp4 && styles.gp4,
        gp5 && styles.gp5,
        h4 && styles.headline4,
        p1 && (bold ? styles.paragraphBold1 : styles.paragraph1),
        p2 && (bold ? styles.paragraphBold2 : styles.paragraph2),
        l1 && styles.label1,
        l2 && styles.label2,
        style,
        {color: color},
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
  gp1: {
    fontFamily: 'GothamPro',
    fontSize: 11,
  },
  gp2: {
    fontFamily: 'GothamPro-Medium',
    fontSize: 15,
  },
  gp3: {
    fontFamily: 'GothamPro-Medium',
    fontSize: 13,
  },
  gp4: {
    fontFamily: 'GothamPro',
    fontSize: 13,
  },
  gp5: {
    fontFamily: 'GothamPro',
    fontSize: 15,
  },
  headline4: {
    fontFamily: 'Oswald-Bold',
    fontSize: 18,
  },
  paragraph1: {
    fontFamily: 'PTSans-Regular',
    fontSize: 14,
  },
  paragraphBold1: {
    fontFamily: 'PTSans-Bold',
    fontSize: 14,
  },
  paragraph2: {
    fontFamily: 'PTSans-Regular',
    fontSize: 12,
  },
  paragraphBold2: {
    fontFamily: 'PTSans-Bold',
    fontSize: 12,
  },
  label1: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 10,
  },
  label2: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
})
