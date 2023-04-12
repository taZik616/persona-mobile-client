import React, {memo} from 'react'

import {Pressable} from 'react-native'
import {StyleSheet} from 'react-native'

import {Color} from 'src/themes'

import {SafeLandscapeView} from './SafeLandscapeView'
import {Text} from './Text'

interface BrandRowItemProps {
  item: any
  isLoading?: boolean
  onPress?: (brand: any) => void
}

export const BrandRowItem = memo(
  ({item, isLoading, onPress}: BrandRowItemProps) => {
    return (
      <SafeLandscapeView additionalPadding={24}>
        <Pressable
          onPress={() => !isLoading && onPress?.(item)}
          style={styles.brandItemContainer}>
          <Text numberOfLines={1} gp4>
            {item.name}
          </Text>
        </Pressable>
      </SafeLandscapeView>
    )
  },
)

const styles = StyleSheet.create({
  brandItemContainer: {
    paddingBottom: 12,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: Color.border,
    paddingTop: 16,
  },
})
