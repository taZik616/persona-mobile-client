import React from 'react'

import {StyleSheet, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {useTypedNavigation} from 'src/hooks'
import {Color} from 'src/themes'
import {TabParamList} from 'src/types'
import {IS_IOS} from 'src/variables'

import {Tab} from './Tab'

interface TabBarProps {
  routes: {
    name: keyof TabParamList
    key: string
    badgeCount?: number
  }[]
  stateIndex: number
}

export function TabBar({routes, stateIndex}: TabBarProps) {
  const {bottom} = useSafeAreaInsets()
  const {navigate} = useTypedNavigation()
  const handlePress = (name: keyof TabParamList, isFocused: boolean) => {
    if (!isFocused) {
      navigate('home', {
        screen: name,
      })
    }
  }

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={[styles.tabContainer, {paddingBottom: IS_IOS ? bottom + 16 : 16}]}>
      {routes.map(({name, key, badgeCount}, id) => {
        const isFocused = stateIndex === id
        return (
          <Tab
            badgeCount={badgeCount}
            isFocused={isFocused}
            key={key}
            onPress={() => handlePress(name, isFocused)}
            tabId={id}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    backgroundColor: Color.bg,
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
})
