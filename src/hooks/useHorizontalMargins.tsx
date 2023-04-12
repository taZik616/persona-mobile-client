import {useMemo} from 'react'

import {useSafeAreaInsets} from 'react-native-safe-area-context'

interface useHorizontalMarginsParams {
  safeArea?: boolean
  baseMarginHorizontal?: number
}
/**
 * @notice Лучше использовать SafeLandscapeView, это предотвратит примерно 3 ре-рендеринга
 */
export const useHorizontalMargins = (params?: useHorizontalMarginsParams) => {
  const {safeArea, baseMarginHorizontal = 24} = params ?? {}

  const {left, right} = useSafeAreaInsets()
  const marginLeft = safeArea
    ? baseMarginHorizontal + left
    : baseMarginHorizontal

  const marginRight = safeArea
    ? baseMarginHorizontal + right
    : baseMarginHorizontal

  return useMemo(
    () => ({
      marginLeft,
      marginRight,
      marginHorizontal: {marginLeft, marginRight},
      paddingHorizontal: {
        paddingLeft: marginLeft,
        paddingRight: marginRight,
      },
    }),
    [marginLeft, marginRight],
  )
}
