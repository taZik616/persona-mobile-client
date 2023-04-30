import React, {memo} from 'react'

import {
  Image,
  Pressable,
  StyleProp,
  ViewStyle,
  useWindowDimensions,
} from 'react-native'
import {StyleSheet} from 'react-native'

import {withHorizontalMargins} from 'src/hoc/withHorizontalMargins'
import {CARD_ASPECT_RATIO} from 'src/variables'

interface CardWithImageProps {
  uri: string
  autoWidth?: boolean
  style?: StyleProp<ViewStyle>
  borderRadius?: number | string
  onPress?: () => void
}

export const CardWithImage = memo(
  ({style, uri, autoWidth, onPress, borderRadius}: CardWithImageProps) => {
    const {width} = useWindowDimensions()

    return (
      <Pressable
        onPress={onPress}
        style={[
          styles.imageContainer,
          // eslint-disable-next-line react-native/no-inline-styles
          {width: autoWidth ? 'auto' : width},
          style,
        ]}>
        <Image
          source={{
            uri,
          }}
          style={[
            styles.image,
            // eslint-disable-next-line react-native/no-inline-styles
            {borderRadius: borderRadius ? borderRadius : 10},
          ]}
        />
      </Pressable>
    )
  },
)

export const CardWithImageWHM = withHorizontalMargins(CardWithImage)

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
