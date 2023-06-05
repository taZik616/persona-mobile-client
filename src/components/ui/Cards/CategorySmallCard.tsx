import React from 'react'

import {Image, Pressable, StyleSheet, View} from 'react-native'

import {CategoryType} from 'src/types'

import {Spacer, Text} from 'ui/index'

interface CategorySmallCardProps extends CategoryType {
  onPress?: (item: CategoryType) => void
}

export const CategorySmallCard = ({
  onPress,
  ...item
}: CategorySmallCardProps) => {
  const {name, image} = item

  return (
    <View style={styles.root}>
      <Pressable onPress={() => onPress?.(item)} style={styles.card}>
        <Image style={styles.img} source={{uri: image}} />
        <Spacer height={8} />
        <View style={styles.brandOrNameContainer}>
          <Text center cg3>
            {(name ?? '').toUpperCase()}
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    flex: 1,
    maxHeight: 126,
    maxWidth: 100,
  },
  img: {
    flex: 1,
  },
  brandOrNameContainer: {
    height: 26,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
