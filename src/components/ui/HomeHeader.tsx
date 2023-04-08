import React from 'react'

import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {Logo} from './icons/logo'
import {IconWithCounterBadge} from './IconWithCounterBadge'
import {Spacer} from './Spacer'

interface HomeHeaderProps {
  onPressSearch?: () => void
  onPressScan?: () => void
}

export function HomeHeader({onPressSearch, onPressScan}: HomeHeaderProps) {
  const {top} = useSafeAreaInsets()

  return (
    <View style={styles.container}>
      <Spacer height={top} />
      <View style={styles.rowContainer}>
        <View style={styles.flexOne} />
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <View style={styles.flexOne}>
          <View style={styles.rightButtons}>
            <TouchableOpacity onPress={onPressSearch} activeOpacity={0.5}>
              <IconWithCounterBadge iconName="search" />
            </TouchableOpacity>
            <Spacer width={12} />
            <TouchableOpacity onPress={onPressScan} activeOpacity={0.5}>
              <IconWithCounterBadge iconName="shopping-bag" badgeCount={5} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
  },
  rightButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  flexOne: {
    flex: 1,
  },
})
