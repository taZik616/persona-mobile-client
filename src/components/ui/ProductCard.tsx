import React, {useMemo} from 'react'

import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import {runOnJS} from 'react-native-reanimated'

import {capitalize, cleanNumber} from 'src/helpers'
import {selectBasketIds, selectFavoritesIds, useTypedSelector} from 'src/store'
import {Color} from 'src/themes'
import {ProductPreviewInfo} from 'src/types'

import {CrossIcon, StarEmptyIcon, StarFilledIcon} from './icons/common'
import {ImagesLooping} from './ImagesLooping'
import {Spacer} from './Spacer'
import {Text} from './Text'

interface ProductCardProps extends ProductPreviewInfo {
  onPress?: (item: ProductPreviewInfo) => void
  onPressTopRightIcon?: (item: ProductPreviewInfo) => void
  onPressAddToBasket?: (item: ProductPreviewInfo) => void
  onRemoveStar?: (item: ProductPreviewInfo) => void
  topRightIcon?: 'star' | 'cross'
  showAddToBasket?: boolean
  width?: number
  hidePrice?: boolean
}

export const ProductCard = ({
  onPress,
  onPressTopRightIcon,
  onPressAddToBasket,
  onRemoveStar,
  topRightIcon,
  showAddToBasket,
  hidePrice,
  width = 200,
  ...item
}: ProductCardProps) => {
  const {
    title,
    // largeImages,
    previewImages,
    price,
    brandImage,
    collection,
    isAvailable,
    priceGroup,
    productId,
    brandName,
  } = item
  const inBasket = useTypedSelector(selectBasketIds).includes(productId)
  const inFavorites = useTypedSelector(selectFavoritesIds).includes(productId)

  const icon = useMemo(() => {
    switch (topRightIcon) {
      case 'cross':
        return <CrossIcon />
      case 'star':
        return inFavorites ? <StarFilledIcon /> : <StarEmptyIcon />
      default:
        return <></>
    }
  }, [topRightIcon, inFavorites])

  return (
    <View style={[styles.container, !isAvailable && styles.disabledCard]}>
      <View style={{width}}>
        {topRightIcon && (
          <Pressable
            onPress={() =>
              !inFavorites
                ? onPressTopRightIcon?.(item)
                : topRightIcon === 'star'
                ? onRemoveStar?.(item)
                : onPressTopRightIcon?.(item)
            }
            hitSlop={10}
            style={styles.topIconContainer}>
            {icon}
          </Pressable>
        )}
        <GestureDetector
          gesture={Gesture.Tap().onEnd(
            () => onPress && runOnJS(onPress)(item),
          )}>
          <View style={{width}}>
            <ImagesLooping width={width} images={previewImages} />
            <Spacer height={6} />
            {brandImage ? (
              <Image
                style={styles.brandImage}
                resizeMode="contain"
                source={{uri: brandImage}}
              />
            ) : (
              <View style={styles.brandName}>
                <Text numberOfLines={1} center gp1>
                  {brandName?.toUpperCase()}
                </Text>
              </View>
            )}
            <Spacer height={8} />
            <View style={styles.textContentContainer}>
              {title ? (
                <>
                  <Text numberOfLines={1} center gp4>
                    {capitalize(title)}
                  </Text>
                  <Spacer height={6} />
                </>
              ) : (
                <></>
              )}
              {(priceGroup || collection) && (
                <>
                  <Text color={Color.primary} numberOfLines={1} center gp4>
                    {capitalize(collection ? collection : priceGroup)}
                  </Text>
                  <Spacer height={6} />
                </>
              )}
              {price && !hidePrice ? (
                <>
                  <Text numberOfLines={1} center gp5>
                    {cleanNumber(price, ' ', 0)} ₽
                  </Text>
                  <Spacer height={6} />
                </>
              ) : (
                <></>
              )}
            </View>
          </View>
        </GestureDetector>
        {showAddToBasket ? (
          <TouchableOpacity
            disabled={inBasket}
            onPress={() => onPressAddToBasket?.(item)}
            style={[styles.addToCartButton, {width}]}>
            <Text gp1>{inBasket ? 'Уже в корзине' : 'Добавить в корзину'}</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <Spacer height={16} />
      </View>
    </View>
  )
}

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
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  topIconContainer: {
    position: 'absolute',
    right: 6,
    top: 6,
    zIndex: 1,
  },
  addToCartButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderColor: Color.primaryGray,
    borderRadius: 8,
    borderWidth: 1,
  },
})
