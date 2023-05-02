import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native'

import {useHorizontalMargins} from 'src/hooks/useHorizontalMargins'
import {useProductsList} from 'src/store/shopApi'
import {ProductPreviewInfo} from 'src/types'
import {IS_ANDROID} from 'src/variables'

import {FashionItemsPresentSkeleton} from './Skeletons/FashionItemsPresent'
import {Spacer} from './Spacer'

import {BottomSheet, BottomSheetRefType} from '../bottom-sheet'

interface FashionItemsPresentProps {
  onPressProduct?: (item: ProductPreviewInfo) => void
}

export interface FashionItemsPresentRefType {
  open?: () => void
  close?: () => void
  setProductIds: (ids: string[]) => void
}

export const FashionItemsPresent = memo(
  forwardRef<FashionItemsPresentRefType, FashionItemsPresentProps>(
    ({onPressProduct}, ref) => {
      const [productIds, setProductIds] = useState<string[]>([])
      const {curData} = useProductsList({
        sortBy: 'IdProduct',
        sortedValues: productIds.join(','),
        ipp: 80,
      })

      const {paddingHorizontal} = useHorizontalMargins({safeArea: true})

      const bottomSheetRef = useRef<BottomSheetRefType>(null)
      useImperativeHandle(ref, () => ({
        open: bottomSheetRef.current?.open,
        close: bottomSheetRef.current?.close,
        setProductIds,
      }))

      const content = useMemo(() => {
        return curData?.data.length ? (
          <FlatList
            data={curData.data}
            contentContainerStyle={[styles.listContainer, paddingHorizontal]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={it => it.productId}
            renderItem={({item}) => (
              <FashionItem {...item} onPress={onPressProduct} />
            )}
          />
        ) : (
          <FashionItemsPresentSkeleton />
        )
      }, [curData?.data, paddingHorizontal])
      return (
        <BottomSheet
          fixAndroidHorizontalList={IS_ANDROID}
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
