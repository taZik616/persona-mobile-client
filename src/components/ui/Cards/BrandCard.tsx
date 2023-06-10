import React, {memo} from 'react'

import {Image, Pressable, StyleSheet, View} from 'react-native'

import {withHorizontalMargins} from 'src/hoc/withHorizontalMargins'
import {BrandType} from 'src/types'

import {Spacer} from 'ui/index'

interface BrandCardProps extends BrandType {
  idInList: number
  imgUri: string
  onPress?: (brandId: string, idInList: number) => void
}

export const BrandCard = memo(
  ({onPress, idInList, brandId, imgUri, logo}: BrandCardProps) => {
    return (
      <Pressable onPress={() => onPress?.(brandId, idInList)}>
        <View style={styles.containerForHorizontalScroll}>
          <Image
            style={styles.img}
            resizeMode="contain"
            source={{uri: imgUri}}
          />
          <Spacer height={8} />
          <View style={styles.brandContainer}>
            <Image
              resizeMode="contain"
              style={styles.logoImage}
              source={{uri: logo}}
            />
          </View>
        </View>
      </Pressable>
    )
  },
)

export const BrandCardWHM = withHorizontalMargins(BrandCard)

const styles = StyleSheet.create({
  containerForHorizontalScroll: {
    height: 220,
    width: 140,
    overflow: 'visible',
  },
  img: {
    flex: 1,
    margin: 6,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  brandContainer: {
    height: 26,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
