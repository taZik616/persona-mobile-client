import React from 'react'

import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import {RouteProp} from '@react-navigation/native'

import {TabBar} from 'src/components/ui/TabBar'
import {TabParamList} from 'src/types'

import {HomeBrandsScreen} from './HomeBrands'
import {HomeCatalogStack} from './HomeCatalogStack'
import {HomeFavouritesScreen} from './HomeFavourites'
import {HomeMainScreen} from './HomeMain'
import {HomeNewProductsScreen} from './HomeNewProducts'
import {HomeProfileScreen} from './HomeProfile'

const Tab = createBottomTabNavigator<TabParamList>()

export const screenOptions = ({}: {
  route: RouteProp<TabParamList>
  navigation: any
}): BottomTabNavigationOptions => ({
  headerShadowVisible: false,
})

export const Home = () => {
  return (
    <Tab.Navigator
      tabBar={props => {
        return (
          // @ts-ignore
          <TabBar routes={props.state.routes} stateIndex={props.state.index} />
        )
      }}
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="homeMain"
        component={HomeMainScreen}
        options={screenOptions}
      />
      <Tab.Screen
        name="homeNewProducts"
        component={HomeNewProductsScreen}
        options={screenOptions}
      />
      <Tab.Screen
        name="homeBrands"
        component={HomeBrandsScreen}
        options={screenOptions}
      />
      <Tab.Screen
        name="homeCatalog"
        component={HomeCatalogStack}
        options={screenOptions}
      />
      <Tab.Screen
        name="homeFavourites"
        component={HomeFavouritesScreen}
        options={screenOptions}
      />
      <Tab.Screen
        name="homeProfile"
        component={HomeProfileScreen}
        options={screenOptions}
      />
    </Tab.Navigator>
  )
}
