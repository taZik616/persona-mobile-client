import React from 'react'

import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import {RouteProp} from '@react-navigation/native'

import {TabBar} from 'src/components/ui/TabBar'
import {TabParamList} from 'src/types'

import {HomeBrandsScreen} from './HomeBrands'
import {HomeCatalogScreen} from './HomeCatalog'
import {HomeFavouritesScreen} from './HomeFavourites'
import {HomeMainScreen} from './HomeMain'
import {HomeNewProductsScreen} from './HomeNewProducts'
import {HomeProfileScreen} from './HomeProfileScreen'

const Tab = createBottomTabNavigator<TabParamList>()

export const screenOptions = ({}: {
  route: RouteProp<TabParamList>
  navigation: any
}): BottomTabNavigationOptions => ({
  headerShadowVisible: false,
})

export function Home() {
  return (
    <Tab.Navigator
      tabBar={props => {
        const routes = props.state.routes.map((item, id) => {
          if (id === 4) return {...item, badgeCount: 999}
          else return item
        })
        return (
          // @ts-ignore
          <TabBar routes={routes} stateIndex={props.state.index} />
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
        component={HomeCatalogScreen}
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
