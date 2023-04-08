import React from 'react'

import {StyleSheet, View} from 'react-native'
import {SvgProps} from 'react-native-svg'
import Feather from 'react-native-vector-icons/Feather'

import {Color} from 'src/themes'

import {Text} from './Text'

interface IconWithCounterBadgeProps {
  iconName?: string
  IconComponent?: (props: SvgProps) => JSX.Element
  badgeCount?: number
  color?: string
}

export function IconWithCounterBadge({
  IconComponent,
  iconName,
  badgeCount,
  color = Color.primaryBlack,
}: IconWithCounterBadgeProps) {
  const displayCount = badgeCount
    ? badgeCount > 99
      ? '99+'
      : badgeCount.toString()
    : 0
  return (
    <View style={styles.icoContainer}>
      {iconName ? (
        <Feather
          style={styles.ico}
          name={iconName}
          size={styles.ico.height}
          color={color}
        />
      ) : IconComponent ? (
        <IconComponent style={styles.ico} color={color} />
      ) : (
        <></>
      )}
      {badgeCount && (
        <View style={[styles.borderCircle]}>
          <View
            style={[
              styles.badgeContainer,
              badgeCount > 99 && styles.badgeBigContainer,
            ]}>
            <Text gp1 color={Color.white}>
              {displayCount}
            </Text>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  ico: {
    width: 24,
    height: 24,
  },
  icoContainer: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  badgeContainer: {
    backgroundColor: Color.primary,
    borderRadius: 50,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Я заметил что на ios, а конкретно Iphone 13 pro max,
  // почему-то у обводки есть малозаметная тень
  borderCircle: {
    padding: 1.5,
    borderRadius: 50,
    backgroundColor: Color.bg,
    position: 'absolute',
    top: -8,
    right: -12,
  },
  badgeBigContainer: {
    width: 26,
    height: 23,
  },
})
