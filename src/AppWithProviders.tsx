import React, {useEffect} from 'react'

import {StatusBar, StyleSheet} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import {App} from 'src/App'

import {persistor, store} from './store'
import {Color} from './themes'

export const AppWithProviders = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={styles.flexOne}>
          <SafeAreaProvider>
            <StatusBar backgroundColor={Color.bg} barStyle={'dark-content'} />
            <App />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  )
}

const styles = StyleSheet.create({
  flexOne: {flex: 1},
})
