import React, {memo} from 'react'

import {Pressable} from 'react-native'
import {StyleSheet} from 'react-native'

import {Color} from 'src/themes'
import {BrandType} from 'src/types'

import {SafeLandscapeView} from './SafeLandscapeView'
import {Text} from './Text'

interface BrandRowItemProps {
  brand: BrandType
  isLoading?: boolean
  onPress?: (brand: any) => void
}

export const BrandRowItem = memo(
  ({brand, isLoading, onPress}: BrandRowItemProps) => {
    return (
      <SafeLandscapeView safeArea>
        <Pressable
          onPress={() => !isLoading && onPress?.(brand)}
          style={styles.brandItemContainer}>
          <Text numberOfLines={1} gp4>
            {brand.name}
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
