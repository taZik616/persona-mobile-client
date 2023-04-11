import {useWindowDimensions} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {getNumColumnsByWidth} from 'src/helpers'

export function useProductListHelper() {
  const {width} = useWindowDimensions()
  const {left, right} = useSafeAreaInsets()

  const activeWidth = width - (left + right)
  const numColumns = getNumColumnsByWidth(activeWidth)

  const cardWidth = numColumns === 2 ? (activeWidth - 48 - 10 * 2) / 2 : 200
  return {
    numColumns,
    cardWidth,
    left,
    right,
    contentPaddingsStyle: {
      paddingLeft: left + 24,
      paddingRight: right + 24,
    },
  }
}
