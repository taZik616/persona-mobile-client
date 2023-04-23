import React from 'react'

import {Image, Pressable, StyleSheet, View} from 'react-native'

import {CategoryOrBrandInterface} from 'src/types'

import {Spacer} from './Spacer'
import {Text} from './Text'

interface CategorySmallCardProps extends CategoryOrBrandInterface {
  onPress?: (item: CategoryOrBrandInterface) => void
}

export const CategorySmallCard = ({
  onPress,
  ...item
}: CategorySmallCardProps) => {
  const {uri, name, logoUri} = item

  return (
    <View style={styles.root}>
      <Pressable onPress={() => onPress?.(item)} style={styles.card}>
        <Image style={styles.img} source={{uri}} />
        <Spacer height={8} />
        <View style={styles.brandOrNameContainer}>
          {logoUri ? (
            <Image
              resizeMode="contain"
              style={styles.logoImage}
              source={{uri: logoUri}}
            />
          ) : (
            <Text center cg3>
              {(name ?? '').toUpperCase()}
            </Text>
          )}
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
  logoImage: {
    width: '100%',
    height: '100%',
  },
  brandOrNameContainer: {
    height: 26,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
