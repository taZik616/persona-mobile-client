import React from 'react'

import {LinkingOptions, NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {Linking, useColorScheme} from 'react-native'

import {useAutoLogin} from 'src/hooks'
import {navigator} from 'src/navigator'
import {Home} from 'src/screens/Home'
import {RootStackParamList} from 'src/types'

import {AllProductsScreen} from './screens/AllProducts'
import {BasketScreen} from './screens/Basket'
import {BuyScreen} from './screens/Buy'
import {ChangePasswordScreen} from './screens/ChangePassword'
import {DEV_TestScreen} from './screens/DEV_Test'
import {DEV_TestHapticScreen} from './screens/DEV_TestHaptic'
import {DEV_TestNotification} from './screens/DEV_TestNotification'
import {FastBuyScreen} from './screens/FastBuy'
import {GiftCardScreen} from './screens/GiftCard'
import {HelpScreen} from './screens/Help'
import {HelpDetailScreen} from './screens/HelpDetail'
import {LoyaltyCardAddScreen} from './screens/LoyaltyCardAdd'
import {MyGiftCardsScreen} from './screens/MyGiftCards'
import {OrdersScreen} from './screens/Orders'
import {PersonalScreen} from './screens/Personal'
import {PersonalEditScreen} from './screens/PersonalEdit'
import {ProductDetailScreen} from './screens/ProductDetail'
import {RecoveryPasswordCompleteScreen} from './screens/RecoveryPasswordComplete'
import {RecoveryPasswordEnterPhoneScreen} from './screens/RecoveryPasswordEnterPhone'
import {SizeChartScreen} from './screens/SizeChart'
import {SubscriptionsScreen} from './screens/Subscriptions'
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
  useAutoLogin()
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
      linking={LINKING}
      ref={navigator}>
      <Stack.Navigator
        initialRouteName="home" // haptic|notification|test
        screenOptions={basicScreenOptions}>
        <Stack.Screen name="home" component={Home} />
        <Stack.Group screenOptions={gestureEnabled}>
          <Stack.Screen name="productDetail" component={ProductDetailScreen} />
          <Stack.Screen
            name="loyaltyCardAdd"
            component={LoyaltyCardAddScreen}
          />
          <Stack.Screen name="help" component={HelpScreen} />
          <Stack.Screen name="helpDetail" component={HelpDetailScreen} />
          <Stack.Screen name="personal" component={PersonalScreen} />
          <Stack.Screen name="personalEdit" component={PersonalEditScreen} />
          <Stack.Screen
            name="changePassword"
            component={ChangePasswordScreen}
          />
          <Stack.Screen
            name="recoveryPasswordEnterPhone"
            component={RecoveryPasswordEnterPhoneScreen}
          />
          <Stack.Screen
            name="recoveryPasswordComplete"
            component={RecoveryPasswordCompleteScreen}
          />
          <Stack.Screen name="orders" component={OrdersScreen} />
          <Stack.Screen name="subscriptions" component={SubscriptionsScreen} />
          <Stack.Screen
            name="basket"
            options={{animation: 'slide_from_bottom'}}
            component={BasketScreen}
          />
          <Stack.Screen name="sizeChart" component={SizeChartScreen} />
          <Stack.Screen name="buy" component={BuyScreen} />
          <Stack.Screen name="fastBuy" component={FastBuyScreen} />
          <Stack.Screen name="giftCard" component={GiftCardScreen} />
          <Stack.Screen name="allProducts" component={AllProductsScreen} />
          <Stack.Screen name="myGiftCards" component={MyGiftCardsScreen} />
          {__DEV__ ? (
            <>
              {/* @ts-ignore */}
              <Stack.Screen name="haptic" component={DEV_TestHapticScreen} />
              {/* @ts-ignore */}
              <Stack.Screen name="test" component={DEV_TestScreen} />
              <Stack.Screen
                // @ts-ignore
                name="notification"
                component={DEV_TestNotification}
              />
            </>
          ) : (
            <></>
          )}
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const LINKING: LinkingOptions<RootStackParamList> = {
  prefixes: ['personashop://'],
  subscribe(listener) {
    const sub = Linking.addEventListener('url', ({url}) => {
      listener(url)
      console.log('🚀 - url:', url)
    })

    return () => {
      sub.remove()
    }
  },
  config: {
    screens: {
      orders: 'orders',
    },
  },
}
