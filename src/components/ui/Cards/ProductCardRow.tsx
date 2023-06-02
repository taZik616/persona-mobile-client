import React, {memo} from 'react'

import {Image, Pressable, StyleSheet, View} from 'react-native'
import {Spacer, Text} from 'ui/index'

import {cleanNumber} from 'src/helpers'
import {Color} from 'src/themes'
import {ProductInBasketI} from 'src/types'

interface ProductCardRowProps extends ProductInBasketI {
  onPress?: (item: ProductInBasketI) => void
}

export const ProductCardRow = memo(
  ({onPress, ...item}: ProductCardRowProps) => {
    const {
      images,
      variant: {size, colorHex},
      price,
      brand,
      productName,
    } = item
    const image = images[0].compressedImage

    return (
      <Pressable onPress={() => onPress?.(item)} style={styles.container}>
        {image && (
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{uri: image}}
          />
        )}
        <Spacer width={8} />
        <View style={styles.body}>
          <Spacer height={4} />
          <Text lineHeight={24} numberOfLines={2} gp2>
            {brand?.name}
          </Text>
          <Text numberOfLines={2} gp4>
            {productName}
          </Text>
        </View>
        <Spacer width={8} />
        <View style={styles.infoRight}>
          <Spacer height={2} />
          <Text numberOfLines={2} right gp4>
            {cleanNumber(price, ' ', 0)} ₽
          </Text>
          <Spacer height={2} />
          {colorHex && (
            <View style={styles.colorContainer}>
              <Text right gp4>
                Цвет:
              </Text>
              <Spacer width={6} />
              <View style={[styles.colorBlock, {backgroundColor: colorHex}]} />
            </View>
          )}
          <Spacer height={2} />
          {size && (
            <Text right gp4>
              {size}
            </Text>
          )}
        </View>
      </Pressable>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: Color.border,
    flexDirection: 'row',
  },
  body: {
    flex: 1,
  },
  colorContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  colorBlock: {
    width: 20,
    height: 20,
  },
  image: {
    height: 90,
    width: 72,
    aspectRatio: '140/180',
  },
  infoRight: {
    maxWidth: '40%',
    paddingTop: 6,
  },
})
