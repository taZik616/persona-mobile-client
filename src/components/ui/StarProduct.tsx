import React, {memo} from 'react'

import {Pressable, StyleProp, ViewStyle} from 'react-native'
import {StarEmptyIcon, StarFilledIcon} from 'ui/icons/common'

import {selectFavoritesIds, useTypedDispatch, useTypedSelector} from 'src/store'
import {
  addItemToFavorites,
  removeItemFromFavorites,
} from 'src/store/favoritesSlice'
import {ProductPreviewInfo} from 'src/types'

interface StarProductProps {
  item: ProductPreviewInfo
  style?: StyleProp<ViewStyle>
}

export const StarProduct = memo(({style, item}: StarProductProps) => {
  const dispatch = useTypedDispatch()
  const {productId} = item
  const inFavorites = useTypedSelector(selectFavoritesIds).includes(productId)
  return (
    <Pressable
      onPress={() =>
        inFavorites
          ? dispatch(removeItemFromFavorites(productId))
          : dispatch(addItemToFavorites(item))
      }
      style={style}>
      {inFavorites ? <StarFilledIcon /> : <StarEmptyIcon />}
    </Pressable>
  )
})
