import {RouteProp, useRoute} from '@react-navigation/native'

import {CatalogStackParamList, RootStackParamList} from 'src/types'

export function useTypedRoute<T extends keyof RootStackParamList>() {
  return useRoute<RouteProp<RootStackParamList, T>>()
}

export function useTypedRouteCatalogStack<
  T extends keyof CatalogStackParamList,
>() {
  return useRoute<RouteProp<CatalogStackParamList, T>>()
}
