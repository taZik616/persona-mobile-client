import React, {memo} from 'react'

import {StyleSheet, TouchableOpacity} from 'react-native'
import FastImage from 'react-native-fast-image'

import {withHorizontalMargins} from 'src/hoc/withHorizontalMargins'
import {Color} from 'src/themes'
import {CategoryType} from 'src/types'

import {Text} from 'ui/index'

interface CategoryCardProps extends CategoryType {
  onPress?: (categoryId: number) => void
}

export const CategoryCard = memo(
  ({name, image, categoryId, onPress}: CategoryCardProps) => {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onPress?.(categoryId)}
        style={styles.container}>
        {image && (
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            source={{uri: image, priority: FastImage.priority.high}}
            style={StyleSheet.absoluteFill}
          />
        )}
        <Text numberOfLines={2} style={styles.title} cg1>
          {name}
        </Text>
      </TouchableOpacity>
    )
  },
)

export const CategoryCardWHM = withHorizontalMargins(CategoryCard)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: '27/11',
    maxHeight: (700 / 38) * 11,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    position: 'relative',
    alignSelf: 'center',
    backgroundColor: Color.secondaryGray,
  },
  title: {
    marginBottom: 14,
    marginLeft: 20,
    width: '50%',
    flexWrap: 'wrap',
  },
})
