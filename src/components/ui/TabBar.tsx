import React from 'react'

import {StyleSheet, View} from 'react-native'

import {useTypedNavigation} from 'src/hooks'
import {Color} from 'src/themes'
import {TabParamList} from 'src/types'
import {IS_IOS} from 'src/variables'

import {Spacer} from './Spacer'
import {Tab} from './Tab'

interface TabBarProps {
  routes: {
    name: keyof TabParamList
    key: string
  }[]
  stateIndex: number
}

export const TabBar = ({routes, stateIndex}: TabBarProps) => {
  const {navigate} = useTypedNavigation()
  const handlePress = (name: keyof TabParamList, isFocused: boolean) => {
    if (!isFocused) {
      // @ts-ignore
      navigate('home', {
        screen: name,
      })
    }
  }

  return (
    <View style={styles.root}>
      <View style={styles.tabContainer}>
        {routes.map(({name, key}, id) => {
          const isFocused = stateIndex === id
          return (
            <Tab
              isFocused={isFocused}
              key={key}
              onPress={() => handlePress(name, isFocused)}
              tabId={id}
            />
          )
        })}
      </View>
      <Spacer withBottomInsets={IS_IOS} height={IS_IOS ? 0 : 12} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
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
  tabContainer: {
    paddingTop: 20,
    flexDirection: 'row',
  },
})
