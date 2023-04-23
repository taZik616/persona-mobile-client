import React, {memo} from 'react'

import {
  Image,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native'

import {useImageAspect} from 'src/hooks'

interface ImgT {
  maxHeight?: number
  uri: string
  widthCoefficient?: number
  style?: StyleProp<ViewStyle>
}

export const Img = memo<ImgT>(
  ({maxHeight = 370, style, uri = '', widthCoefficient = 1}) => {
    const aspect = useImageAspect(uri)
    const {width: W} = useWindowDimensions()

    let width = W * widthCoefficient
    const height = width / aspect

    if (maxHeight && height > maxHeight) {
      width = maxHeight * aspect
    }

    return (
      <View style={[mainBlock, {maxHeight}, style]}>
        <Image
          style={[
            img,
            {
              width,
              height,
              maxHeight,
            },
          ]}
          resizeMode="contain"
          source={{uri}}
        />
      </View>
    )
  },
)

const styles = StyleSheet.create({
  img: {
    overflow: 'hidden',
    maxWidth: '100%',
  },
  mainBlock: {
    width: '100%',
    alignItems: 'center',
  },
})

const {img, mainBlock} = styles
