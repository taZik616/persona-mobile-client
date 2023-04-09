import React, {useEffect} from 'react'

import {StatusBar, StyleSheet} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'
import {Provider} from 'react-redux'

import {App} from 'src/App'

import {store} from './store'
import {Color} from './themes'

export function AppWithProviders() {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.flexOne}>
        <SafeAreaProvider>
          <StatusBar backgroundColor={Color.bg} barStyle={'light-content'} />
          <App />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  flexOne: {flex: 1},
})
