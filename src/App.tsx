import React from 'react'

import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {useColorScheme} from 'react-native'

import {navigator} from 'src/navigator'
import {Home} from 'src/screens/Home'
import {RootStackParamList} from 'src/types'

import {ProductDetailScreen} from './screens/ProductDetail'
import {SettingsScreen} from './screens/SettingsScreen'
import {Color} from './themes'

const Stack = createNativeStackNavigator<RootStackParamList>()

const basicScreenOptions = {
  headerShown: false,
  gestureEnabled: false,
}

const gestureEnabled = {
  gestureEnabled: true,
}

export const App = () => {
  const isDark = useColorScheme() === 'dark'
  return (
    <NavigationContainer
      theme={{
        dark: isDark,
        colors: {
          background: Color.bg,
          border: Color.secondaryGray,
          card: Color.card,
          primary: Color.primary,
          text: Color.textBase1,
          notification: Color.primary,
        },
      }}
      ref={navigator}>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={basicScreenOptions}>
        <Stack.Screen name="home" component={Home} />
        <Stack.Group screenOptions={gestureEnabled}>
          <Stack.Screen name="settings" component={SettingsScreen} />
          <Stack.Screen name="productDetail" component={ProductDetailScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
