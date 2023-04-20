import React, {memo, useMemo, useRef} from 'react'

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
import {selectFavoritesIds, useTypedSelector} from 'src/store'
import {Color} from 'src/themes'
import {ProductPreviewInfo} from 'src/types'

import {Checkmark} from './Checkmark'
import {CrossIcon, StarEmptyIcon, StarFilledIcon} from './icons/common'
import {ImagesLooping} from './ImagesLooping'
import {Spacer} from './Spacer'
import {Text} from './Text'

interface BasketCardProps extends ProductPreviewInfo {
  id: string
  onPress?: (basketItemId: string, item: ProductPreviewInfo) => void
  onRemove?: (basketItemId: string) => void
  onChangeSelect?: (basketItemId: string, isSelected: boolean) => void
  onPressRemoveStar?: (item: ProductPreviewInfo) => void
  onPressStar?: (item: ProductPreviewInfo) => void
}
export const BasketCard = memo(
  ({
    onRemove,
    onChangeSelect,
    id,
    onPressStar,
    onPressRemoveStar,
    onPress,
    ...item
  }: BasketCardProps) => {
    const {
      price,
      title,
      collection,
      priceGroup,
      brandImage,
      brandName,
      productId,
    } = item
    const inFavorites = useTypedSelector(selectFavoritesIds).includes(productId)
    const swipeableRef = useRef<any>(null)

    const renderLeftActions = useMemo(() => {
      return function (progress: any) {
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
              swipeableRef.current?.close()
              setTimeout(() => {
                inFavorites ? onPressRemoveStar?.(item) : onPressStar?.(item)
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
      }
    }, [onPressStar, onPressRemoveStar, item, inFavorites])

    const renderRightActions = useMemo(() => {
      return function (progress: any) {
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
              swipeableRef.current?.close()
              onRemove?.(id)
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
      }
    }, [onRemove, id])

    return (
      <View style={styles.root}>
        <Swipeable
          ref={swipeableRef}
          overshootLeft={false}
          overshootRight={false}
          renderLeftActions={renderLeftActions}
          renderRightActions={renderRightActions}>
          <View style={styles.container}>
            <View style={styles.topRowContainer}>
              <View style={styles.checkbox}>
                <Checkmark
                  defaultValue={false}
                  onChange={isSelected => onChangeSelect?.(id, isSelected)}
                />
              </View>
              <GestureDetector
                gesture={Gesture.Tap().onEnd(
                  () => onPress && runOnJS(onPress)(id, item),
                )}>
                <View style={styles.images}>
                  <View>
                    <ImagesLooping width={110} images={item.previewImages} />
                  </View>
                </View>
              </GestureDetector>
              <Pressable
                onPress={() => onPress && onPress(id, item)}
                style={styles.costContainer}>
                <Text gp5>{cleanNumber(price, ' ', 0)} ₽</Text>
              </Pressable>
            </View>
            <Pressable onPress={() => onPress && onPress(id, item)}>
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
