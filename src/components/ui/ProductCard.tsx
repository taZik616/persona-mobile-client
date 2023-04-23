import React, {memo} from 'react'

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
import {selectBasketIds, useTypedDispatch, useTypedSelector} from 'src/store'
import {addItemToBasket} from 'src/store/basketSlice'
import {removeItemFromFavorites} from 'src/store/favoritesSlice'
import {Color} from 'src/themes'
import {ProductPreviewInfo} from 'src/types'

import {CrossIcon} from './icons/common'
import {ImagesLooping} from './ImagesLooping'
import {Spacer} from './Spacer'
import {StarProduct} from './StarProduct'
import {Text} from './Text'

interface ProductCardProps extends ProductPreviewInfo {
  onPress?: (item: ProductPreviewInfo) => void
  topRightIcon?: 'star' | 'cross'
  showAddToBasket?: boolean
  width?: number
  hidePrice?: boolean
  singleImage?: boolean
}

export const ProductCard = ({
  onPress,
  topRightIcon,
  showAddToBasket,
  hidePrice,
  singleImage,
  width = 200,
  ...item
}: ProductCardProps) => {
  const {
    title,
    previewImages,
    price,
    brandImage,
    collection,
    isAvailable,
    priceGroup,
    brandName,
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
                resizeMode="cover"
                style={styles.singleImage}
                source={{uri: previewImages[0]}}
              />
            ) : (
              <ImagesLooping width={width} images={previewImages} />
            )}

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
          <AddBasketButton item={item} width={width} />
        ) : (
          <></>
        )}
        <Spacer height={16} />
      </View>
    </View>
  )
}

interface AddBasketButtonProps {
  item: ProductPreviewInfo
  width: number
}

const AddBasketButton = memo(({item, width}: AddBasketButtonProps) => {
  const dispatch = useTypedDispatch()
  const inBasket = useTypedSelector(selectBasketIds).includes(item.productId)
  return (
    <TouchableOpacity
      disabled={inBasket}
      onPress={() => dispatch(addItemToBasket(item))}
      style={[styles.addToCartButton, {width}]}>
      <Text gp1>{inBasket ? 'Уже в корзине' : 'Добавить в корзину'}</Text>
    </TouchableOpacity>
  )
})

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
  singleImage: {
    flex: 1,
    aspectRatio: '140/180',
  },
})
