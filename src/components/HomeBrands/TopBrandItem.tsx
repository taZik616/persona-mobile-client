import React from 'react'

import {Image, TouchableOpacity} from 'react-native'
import {StyleSheet, View} from 'react-native'

import {Color} from 'src/themes'

interface TopBrandItemProps {
  isLoading?: boolean
  item: any
  onPress?: (item: any) => void
}

export function TopBrandItem({item, isLoading, onPress}: TopBrandItemProps) {
  return (
    <TouchableOpacity
      onPress={() => !isLoading && onPress?.(item)}
      style={styles.topBrandContainer}>
      {!isLoading ? (
        <Image
          style={styles.flexOne}
          resizeMode="center"
          source={{uri: item.logo}}
        />
      ) : (
        <View style={styles.skeletonContainer}>
          <></>
        </View>
      )}
    </TouchableOpacity>
  )
}

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
