import React, {memo} from 'react'

import {FlashList} from '@shopify/flash-list'
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import {Spacer} from 'ui/index'

import {ProductCardSkeleton} from './ProductCard'

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
          showsVerticalScrollIndicator={false}
          estimatedItemSize={351} // if showAddToBasket - 379
          renderItem={() => <ProductCardSkeleton width={width} />}
          keyExtractor={(_, id) => String(id)}
          ListHeaderComponent={<Spacer height={20} />}
        />
      </View>
    )
  },
)

const emptyArr = Array(10).fill('')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
