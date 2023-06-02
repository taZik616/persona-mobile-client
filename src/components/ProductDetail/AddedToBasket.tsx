import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'

import {BottomSheet, BottomSheetRefType} from 'components/bottom-sheet'
import {Image, Pressable, StyleSheet, View} from 'react-native'
import {Button, SafeLandscapeView, Spacer} from 'ui/index'

import {ProductPreviewInfo} from 'src/types'

interface AddedToBasketProps {
  onPressGoBasket?: () => void
  onPressContinue?: () => void
}

export interface AddedToBasketRefType {
  open?: () => void
  close?: () => void
}

export const AddedToBasket = memo(
  forwardRef<AddedToBasketRefType, AddedToBasketProps>(
    ({onPressGoBasket, onPressContinue}, ref) => {
      const bottomSheetRef = useRef<BottomSheetRefType>(null)

      useImperativeHandle(ref, () => ({
        open: bottomSheetRef.current?.open,
        close: bottomSheetRef.current?.close,
      }))

      const content = useMemo(() => {
        return (
          <SafeLandscapeView>
            <Spacer height={16} />
            <Button onPress={onPressContinue} gp5 variant="outline">
              Продолжить покупки
            </Button>
            <Spacer height={16} />
            <Button gp5 onPress={onPressGoBasket}>
              Перейти в корзину
            </Button>
            <Spacer withBottomInsets height={56} />
          </SafeLandscapeView>
        )
      }, [onPressGoBasket, onPressContinue])

      return (
        <BottomSheet
          title="ТОВАР ДОБАВЛЕН В КОРЗИНУ"
          closeDistance={60}
          ref={bottomSheetRef}>
          {content}
        </BottomSheet>
      )
    },
  ),
)

interface FashionItemProps extends ProductPreviewInfo {
  onPress?: (item: ProductPreviewInfo) => void
}

export const FashionItem = memo(({onPress, ...item}: FashionItemProps) => {
  const {previewImages, brandImage} = item

  return (
    <Pressable onPress={() => onPress?.(item)}>
      <View style={styles.containerForHorizontalScroll}>
        <Image style={styles.img} source={{uri: previewImages[0]}} />
        <Spacer height={8} />
        <View style={styles.brandOrNameContainer}>
          <Image
            resizeMode="contain"
            style={styles.brandLogo}
            source={{uri: brandImage}}
          />
        </View>
      </View>
    </Pressable>
  )
})

const styles = StyleSheet.create({
  containerForHorizontalScroll: {
    height: 220,
    width: 140,
    overflow: 'visible',
  },
  listContainer: {
    paddingTop: 16,
    gap: 26,
    paddingBottom: 22,
  },
  img: {
    flex: 1,
  },
  brandLogo: {
    width: '100%',
    height: '100%',
  },
  brandOrNameContainer: {
    height: 26,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
