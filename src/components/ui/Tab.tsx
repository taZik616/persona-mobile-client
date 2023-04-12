import React from 'react'

import {Pressable, StyleSheet} from 'react-native'

import {Color} from 'src/themes'

import {tabBarIcons} from './icons/tab-bar-icons'
import {IconWithCounterBadge} from './IconWithCounterBadge'
import {Spacer} from './Spacer'
import {Text} from './Text'

interface TabProps {
  onPress?: () => void
  tabId: number
  color?: string
  activeColor?: string
  isFocused: boolean
  badgeCount?: number
}

const navLabelsById = [
  'Главная',
  'Новинки',
  'Бренды',
  'Каталог',
  'Избранное',
  'Профиль',
]

export const Tab = ({
  onPress,
  isFocused,
  tabId,
  color = Color.primaryBlack,
  activeColor = Color.primary,
  badgeCount,
}: TabProps) => {
  const Icon = tabBarIcons[tabId]
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <IconWithCounterBadge
        badgeCount={badgeCount}
        color={isFocused ? activeColor : color}
        IconComponent={Icon}
      />
      <Spacer height={5} />
      <Text center color={isFocused ? activeColor : color} gp1>
        {navLabelsById[tabId]}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
