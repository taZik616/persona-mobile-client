import React, {memo} from 'react'

import {Image, TouchableOpacity} from 'react-native'
import {StyleSheet, View} from 'react-native'

import {Color} from 'src/themes'
import {BrandType} from 'src/types'

interface TopBrandItemProps {
  isLoading?: boolean
  brand: BrandType
  onPress?: (item: any) => void
}

export const TopBrandItem = memo(
  ({brand, isLoading, onPress}: TopBrandItemProps) => {
    return (
      <TouchableOpacity
        onPress={() => !isLoading && onPress?.(brand)}
        style={styles.topBrandContainer}>
        {!isLoading ? (
          <Image
            style={styles.flexOne}
            resizeMode="center"
            source={{uri: brand.logo}}
          />
        ) : (
          <View style={styles.skeletonContainer}>
            <></>
          </View>
        )}
      </TouchableOpacity>
    )
  },
)

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
    paddingTop: 12,
  },
  skeletonContainer: {
    backgroundColor: Color.secondaryGray,
    flex: 1,
    borderRadius: 10,
  },
  topBrandContainer: {
    flex: 1,
    maxWidth: '33.3%',
    aspectRatio: '100/45',
    minHeight: 45,
    maxHeight: 70,
  },
})
