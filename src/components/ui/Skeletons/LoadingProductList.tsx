import React, {memo} from 'react'

import {FlashList} from '@shopify/flash-list'
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'

import {ProductCardSkeleton} from './ProductCard'

import {Spacer} from '../Spacer'

interface LoadingSkeletonProps {
  width?: number
  style?: StyleProp<ViewStyle>
  numColumns?: number
}

export const LoadingProductListSkeleton = memo(
  ({width, style, numColumns}: LoadingSkeletonProps) => {
    return (
      <View style={[style, styles.container]}>
        <Spacer height={16} />
        <FlashList
          key={numColumns}
          numColumns={numColumns}
          data={emptyArr}
          estimatedItemSize={351} // if showAddToBasket - 379
          renderItem={() => <ProductCardSkeleton width={width} />}
          keyExtractor={(_, id) => String(id)}
        />
      </View>
    )
  },
)

const emptyArr = Array(9).fill('')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
