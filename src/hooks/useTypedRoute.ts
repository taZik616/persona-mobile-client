import {RouteProp, useRoute} from '@react-navigation/native'

import {
  CatalogStackParamList,
  RootStackParamList,
  TabParamList,
} from 'src/types'

export function useTypedRoute<T extends keyof RootStackParamList>() {
  return useRoute<RouteProp<RootStackParamList, T>>()
}

export function useTypedRouteHome<T extends keyof TabParamList>() {
  return useRoute<RouteProp<TabParamList, T>>()
}

export function useTypedRouteCatalogStack<
  T extends keyof CatalogStackParamList,
>() {
  return useRoute<RouteProp<CatalogStackParamList, T>>()
}
