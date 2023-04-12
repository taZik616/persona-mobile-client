import React from 'react'

import {
  Image,
  StyleProp,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native'
import {StyleSheet} from 'react-native'

import {CARD_ASPECT_RATIO} from 'src/variables'

interface CardWithImageProps {
  uri: string
  style?: StyleProp<ViewStyle>
  borderRadius?: number
}

export const CardWithImage = ({
  style,
  uri,
  borderRadius,
}: CardWithImageProps) => {
  const {width} = useWindowDimensions()
  return (
    <View style={[styles.imageContainer, {width}, style]}>
      <Image
        source={{
          uri,
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        style={[styles.image, {borderRadius: borderRadius ? borderRadius : 10}]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
    maxHeight: 300,
    maxWidth: 300 * CARD_ASPECT_RATIO,
    overflow: 'hidden',
    aspectRatio: `${CARD_ASPECT_RATIO}/1`,
  },
})
