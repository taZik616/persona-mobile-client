import React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {CatalogStackParamList} from 'src/types'

import {HomeCatalogCategoriesScreen} from './HomeCatalogCategories'
import {HomeCatalogProductsScreen} from './HomeCatalogProducts'
import {HomeCatalogSubcategoriesScreen} from './HomeCatalogSubcategories'

const Stack = createNativeStackNavigator<CatalogStackParamList>()

export const HomeCatalogStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="categories">
      <Stack.Screen name="categories" component={HomeCatalogCategoriesScreen} />
      <Stack.Screen
        name="subcategories"
        component={HomeCatalogSubcategoriesScreen}
      />
      <Stack.Screen name="products" component={HomeCatalogProductsScreen} />
    </Stack.Navigator>
  )
}
