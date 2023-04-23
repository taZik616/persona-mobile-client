import React, {memo} from 'react'

import {Image, StyleSheet, TouchableOpacity} from 'react-native'

import {withHorizontalMargins} from 'src/hoc/withHorizontalMargins'
import {Color} from 'src/themes'

import {Text} from '../ui/Text'

interface CategoryCardProps {
  imgUri: string
  categoryId: string
  title: string
  onPress?: (categoryId: string) => void
}

export const CategoryCard = memo(
  ({imgUri, title, categoryId, onPress}: CategoryCardProps) => {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onPress?.(categoryId)}
        style={styles.container}>
        <Image source={{uri: imgUri}} style={StyleSheet.absoluteFill} />
        <Text numberOfLines={2} style={styles.title} cg1>
          {title}
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
