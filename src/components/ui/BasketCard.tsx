import React, {memo, useCallback, useRef} from 'react'

import {
  Image,
  Pressable,
  Animated as RNAnimated,
  StyleSheet,
  View,
} from 'react-native'
import {
  Gesture,
  GestureDetector,
  RectButton,
  Swipeable,
} from 'react-native-gesture-handler'
import {runOnJS} from 'react-native-reanimated'

import {capitalize, cleanNumber} from 'src/helpers'
import {withHorizontalMargins} from 'src/hoc/withHorizontalMargins'
import {
  selectBasketSelectedIds,
  selectFavoritesIds,
  useTypedDispatch,
  useTypedSelector,
} from 'src/store'
import {removeItemFromBasket} from 'src/store/basketSlice'
import {
  addItemToFavorites,
  removeItemFromFavorites,
} from 'src/store/favoritesSlice'
import {Color} from 'src/themes'
import {ProductPreviewInfo} from 'src/types'

import {Checkmark} from './Checkmark'
import {CrossIcon, StarEmptyIcon, StarFilledIcon} from './icons/common'
import {ImagesLooping} from './ImagesLooping'
import {Spacer} from './Spacer'
import {Text} from './Text'

interface BasketCardProps extends ProductPreviewInfo {
  onPress?: (item: ProductPreviewInfo) => void
  onChangeSelect?: (item: ProductPreviewInfo, isSelected: boolean) => void
}
export const BasketCard = memo(
  ({onPress, onChangeSelect, ...item}: BasketCardProps) => {
    const {
      price,
      title,
      collection,
      priceGroup,
      brandImage,
      brandName,
      isAvailable,
      productId,
    } = item
    const swipeableRef = useRef<any>(null)
    const onClose = useCallback(() => swipeableRef.current?.close(), [])

    return (
      <View style={styles.root}>
        <Swipeable
          ref={swipeableRef}
          overshootLeft={false}
          overshootRight={false}
          renderLeftActions={progress => (
            <LeftAction item={item} onClose={onClose} progress={progress} />
          )}
          renderRightActions={progress => (
            <RightAction
              productId={productId}
              onClose={onClose}
              progress={progress}
            />
          )}>
          <View style={styles.container}>
            <View style={styles.topRowContainer}>
              <View style={styles.checkbox}>
                {isAvailable && (
                  <WrappedCheckBox
                    item={item}
                    onChangeSelect={onChangeSelect}
                  />
                )}
              </View>
              <GestureDetector
                gesture={Gesture.Tap().onEnd(
                  () => onPress && runOnJS(onPress)(item),
                )}>
                <View style={styles.images}>
                  <View>
                    <ImagesLooping width={110} images={item.previewImages} />
                  </View>
                </View>
              </GestureDetector>
              <Pressable
                onPress={() => onPress && onPress(item)}
                style={styles.costContainer}>
                <Text gp5>{cleanNumber(price, ' ', 0)} ₽</Text>
              </Pressable>
            </View>
            <Pressable onPress={() => onPress && onPress(item)}>
              <Spacer height={4} />
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
              <Spacer height={4} />
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
              </View>
            </Pressable>
          </View>
        </Swipeable>
      </View>
    )
  },
)

const WrappedCheckBox = memo(({onChangeSelect, item}: any) => {
  const isSelected = useTypedSelector(selectBasketSelectedIds).includes(
    item.productId,
  )
  return (
    <Checkmark
      value={isSelected}
      onChange={val => onChangeSelect?.(item, val)}
    />
  )
})

export const BasketCardWHM = withHorizontalMargins(BasketCard)

interface LeftActionProps {
  onClose?: () => void
  progress: RNAnimated.AnimatedInterpolation<number>
  item: ProductPreviewInfo
}

export const LeftAction = memo(({progress, item, onClose}: LeftActionProps) => {
  const {productId} = item
  const inFavorites = useTypedSelector(selectFavoritesIds).includes(productId)
  const dispatch = useTypedDispatch()

  const scale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
    extrapolate: 'clamp',
  })
  const textScale = scale.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  })

  return (
    <RectButton
      onPress={() => {
        onClose?.()
        setTimeout(() => {
          inFavorites
            ? dispatch(removeItemFromFavorites(productId))
            : dispatch(addItemToFavorites(item))
        }, 300)
      }}
      style={styles.swipeableBtnL}>
      <RNAnimated.View
        style={{
          transform: [{scale: scale}],
        }}>
        {inFavorites ? (
          <StarFilledIcon color={Color.white} />
        ) : (
          <StarEmptyIcon color={Color.white} />
        )}
      </RNAnimated.View>
      <Spacer height={12} />
      <RNAnimated.Text
        style={[styles.btnText, {transform: [{scale: textScale}]}]}>
        {inFavorites ? 'Убрать с избранного' : 'В избранное'}
      </RNAnimated.Text>
    </RectButton>
  )
})

interface RightActionProps {
  onClose?: () => void
  progress: RNAnimated.AnimatedInterpolation<number>
  productId: string
}

const RightAction = memo(({onClose, progress, productId}: RightActionProps) => {
  const dispatch = useTypedDispatch()
  const scale = progress.interpolate({
    inputRange: [0, 0, 1, 2],
    outputRange: [0.4, 0.4, 1, 1],
  })
  const textScale = scale.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  })
  return (
    <RectButton
      onPress={() => {
        onClose?.()
        dispatch(removeItemFromBasket(productId))
      }}
      style={styles.swipeableBtnR}>
      <RNAnimated.View
        style={[
          {
            transform: [{scale: scale}],
          },
        ]}>
        <CrossIcon color={Color.white} />
      </RNAnimated.View>
      <Spacer height={12} />
      <RNAnimated.Text
        style={[styles.btnText, {transform: [{scale: textScale}]}]}>
        Удалить
      </RNAnimated.Text>
    </RectButton>
  )
})

const styles = StyleSheet.create({
  root: {
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',

    borderColor: Color.secondaryGray,
  },
  container: {
    padding: 14,
    backgroundColor: Color.bg,
  },
  topRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    columnGap: 8,
  },
  checkbox: {
    flex: 1,
  },
  images: {
    alignItems: 'center',
    width: 110,
  },
  costContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  textContentContainer: {
    flex: 1,
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
  swipeableBtnL: {
    width: 100,
    height: '100%',
    backgroundColor: Color.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeableBtnR: {
    width: 80,
    height: '100%',
    backgroundColor: Color.textRed1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: 'GothamPro',
    fontSize: 13,
    color: Color.white,
    textAlign: 'center',
    lineHeight: 16,
  },
})
