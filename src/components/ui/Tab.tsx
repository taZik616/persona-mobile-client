import React from 'react'

import {Pressable, StyleSheet} from 'react-native'

import {selectFavoritesCounter, useTypedSelector} from 'src/store'
import {Color} from 'src/themes'
import {IS_ANDROID, SCREEN_W} from 'src/variables'

import {tabBarIcons} from 'ui/icons/tab-bar-icons'
import {Spacer, Text} from 'ui/index'

import {IconWithCounterBadge} from './IconWithCounterBadge'

interface TabProps {
  onPress?: () => void
  tabId: number
  color?: string
  activeColor?: string
  isFocused: boolean
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
}: TabProps) => {
  const favoritesCount = useTypedSelector(selectFavoritesCounter)
  const Icon = tabBarIcons[tabId]

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <IconWithCounterBadge
        badgeCount={tabId === 4 ? favoritesCount : undefined}
        color={isFocused ? activeColor : color}
        IconComponent={Icon}
      />
      <Spacer height={5} />
      <Text
        style={styles.text}
        center
        color={isFocused ? activeColor : color}
        gp1>
        {navLabelsById[tabId]}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: IS_ANDROID ? (SCREEN_W < 400 ? 9.5 : 11) : 11,
  },
})
