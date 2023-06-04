import React, {memo} from 'react'

import {Image, Pressable, StyleSheet, View} from 'react-native'
import FastImage from 'react-native-fast-image'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import {runOnJS} from 'react-native-reanimated'
import {CrossIcon} from 'ui/icons/common'
import {ImagesLooping, Spacer, StarProduct, Text} from 'ui/index'

import {capitalize, cleanNumber} from 'src/helpers'
import {useTypedDispatch} from 'src/store'
import {removeItemFromFavorites} from 'src/store/favoritesSlice'
import {Color} from 'src/themes'
import {ProductPreviewInfo} from 'src/types'

interface ProductCardProps extends ProductPreviewInfo {
  onPress?: (item: ProductPreviewInfo) => void
  topRightIcon?: 'star' | 'cross'
  width?: number
  hidePrice?: boolean
  singleImage?: boolean
}

export const ProductCard = ({
  onPress,
  topRightIcon,
  hidePrice,
  singleImage,
  width = 200,
  ...item
}: ProductCardProps) => {
  const {
    productName,
    images,
    price,
    brand,
    collection,
    isAvailable,
    discountPercent,
    productId,
  } = item

  return (
    <View style={[styles.container, !isAvailable && styles.disabledCard]}>
      <View style={{width}}>
        {topRightIcon === 'star' ? (
          <StarProduct style={styles.topIconContainer} item={item} />
        ) : (
          <></>
        )}
        {topRightIcon === 'cross' ? <Remove productId={productId} /> : <></>}
        <GestureDetector
          gesture={Gesture.Tap().onEnd(
            () => onPress && runOnJS(onPress)(item),
          )}>
          <View style={{width}}>
            {singleImage ? (
              <Image
                resizeMode="contain"
                style={styles.singleImage}
                source={{uri: images[0].compressedImage}}
              />
            ) : (
              <ImagesLooping
                width={width}
                images={images.map(a => a.compressedImage)}
              />
            )}

            <Spacer height={6} />
            {brand?.logo ? (
              <FastImage
                key={brand.brandId + brand.logo}
                style={styles.brandImage}
                resizeMode="contain"
                source={{uri: brand.logo, priority: FastImage.priority.high}}
              />
            ) : (
              <View style={styles.brandName}>
                <Text numberOfLines={1} center gp1>
                  {brand?.name?.toUpperCase()}
                </Text>
              </View>
            )}
            <Spacer height={8} />
            <View style={styles.textContentContainer}>
              {productName ? (
                <>
                  <Text numberOfLines={1} center gp4>
                    {capitalize(productName)}
                  </Text>
                  <Spacer height={6} />
                </>
              ) : (
                <></>
              )}
              {collection ? (
                <>
                  <Text color={Color.primary} numberOfLines={1} center gp4>
                    {capitalize(collection)}
                  </Text>
                  <Spacer height={6} />
                </>
              ) : (
                <></>
              )}
              {price && !hidePrice ? (
                <>
                  <View style={styles.priceContainer}>
                    <Text numberOfLines={1} center gp4>
                      {cleanNumber(price, ' ', 0, discountPercent)} ₽
                    </Text>
                    {discountPercent ? (
                      <>
                        <Spacer width={8} />
                        <Text
                          style={styles.priceWithoutDiscount}
                          numberOfLines={1}
                          color={Color.primaryGray}
                          center
                          gp1>
                          {cleanNumber(price, ' ', 0)}
                        </Text>
                      </>
                    ) : (
                      <></>
                    )}
                  </View>
                  <Spacer height={6} />
                </>
              ) : (
                <></>
              )}
            </View>
          </View>
        </GestureDetector>
        <Spacer height={16} />
      </View>
    </View>
  )
}

// interface AddBasketButtonProps {
//   item: ProductPreviewInfo
//   width: number
// }

// const AddBasketButton = memo(({item, width}: AddBasketButtonProps) => {
//   const dispatch = useTypedDispatch()
//   const isAuthenticated = useTypedSelector(selectIsAuthenticated)
//   const inBasket = useTypedSelector(selectBasketIds).includes(item.productId)

//   const handlePress = () => {
//     if (isAuthenticated) {
//       dispatch(addItemToBasket(item))
//     } else {
//       showAlertBasketLocked()
//     }
//   }
//   return (
//     <TouchableOpacity
//       disabled={inBasket}
//       onPress={handlePress}
//       style={[styles.addToCartButton, {width}]}>
//       <Text gp1>{inBasket ? 'Уже в корзине' : 'Добавить в корзину'}</Text>
//     </TouchableOpacity>
//   )
// })

interface RemoveProps {
  productId: string
}
const Remove = memo(({productId}: RemoveProps) => {
  const dispatch = useTypedDispatch()
  return (
    <Pressable
      onPress={() => dispatch(removeItemFromFavorites(productId))}
      style={styles.topIconContainer}>
      <CrossIcon />
    </Pressable>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  disabledCard: {
    opacity: 0.7,
  },
  brandImage: {
    width: '100%',
    aspectRatio: '100/40',
    height: 30,
    alignSelf: 'center',
  },
  brandName: {
    width: '100%',
    height: 30,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  textContentContainer: {
    width: '100%',
    minHeight: 26,
    maxHeight: 60,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  topIconContainer: {
    position: 'absolute',
    right: 6,
    top: 6,
    zIndex: 1,
  },
  // addToCartButton: {
  //   paddingVertical: 8,
  //   paddingHorizontal: 10,
  //   marginTop: 4,
  //   alignItems: 'center',
  //   borderColor: Color.primaryGray,
  //   borderRadius: 8,
  //   borderWidth: 1,
  // },
  singleImage: {
    flex: 1,
    aspectRatio: '140/180',
  },
  priceContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  priceWithoutDiscount: {
    textDecorationLine: 'line-through',
    textDecorationColor: Color.textBase1,
  },
})
