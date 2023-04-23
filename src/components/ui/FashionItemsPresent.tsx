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
import {ProductPreviewInfo} from 'src/types'

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
      const {paddingHorizontal} = useHorizontalMargins({safeArea: true})

      const bottomSheetRef = useRef<BottomSheetRefType>(null)
      useImperativeHandle(ref, () => ({
        open: bottomSheetRef.current?.open,
        close: bottomSheetRef.current?.close,
        setProductIds,
      }))

      // Ля тут нужен запрос который бы вернул по списку ID список товаров(
      //const isLoading = true
      const data = fakeData

      const content = useMemo(() => {
        return (
          <FlatList
            data={data}
            contentContainerStyle={[styles.listContainer, paddingHorizontal]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={it => it.productId}
            renderItem={({item}) => (
              <FashionItem {...item} onPress={onPressProduct} />
            )}
          />
        )
      }, [data, paddingHorizontal])
      return (
        <BottomSheet closeDistance={60} ref={bottomSheetRef}>
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

// И снова прибегаем к фейк-дата 😭
const fakeData: ProductPreviewInfo[] = [
  {
    brandImage: 'http://89.108.71.146:8000/CAT_logo/422/losddsfsdfgo.jpg',
    brandName: 'BILANCIONI',
    collection: undefined,
    isAvailable: true,
    largeImages: [
      'http://89.108.71.146:8000/IMGS_Path/IMG_0940_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/IMG_0939_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/7df5fe8d76135bd0addb8c6712d90299_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/2140b5319cf145d6a140249b3d161e1f_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/f22775d543082bcb0e1f9c94ebb5c7bf_compressed.jpg',
    ],
    previewImages: [
      'http://89.108.71.146:8000/IMGS_Preview/preview_IMG_0940_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_IMG_0939_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_7df5fe8d76135bd0addb8c6712d90299_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_2140b5319cf145d6a140249b3d161e1f_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_f22775d543082bcb0e1f9c94ebb5c7bf_compressed.jpg',
    ],
    price: 35450,
    priceGroup: 'Распродажа 20%',
    productId: '30812',
    title: 'Брюки BILANCIONI',
  },
  {
    brandImage:
      'http://89.108.71.146:8000/CAT_logo/164/escada_sportapr_vector_2662.png',
    brandName: 'ESCADA SPORT',
    collection: undefined,
    isAvailable: true,
    largeImages: [
      'http://89.108.71.146:8000/IMGS_Path/IMG_1408_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/IMG_1413_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/IMG_1411_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/IMG_1407_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/IMG_1401_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/IMG_n98898b_ol1402_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/d7c654b0a0a044ff865b5339df334bac_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/ede6185ce246396b05939b4b20fc679b_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/d50e0ff2f6b4901f518326a018e7013a_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/d7c4224584b0cd7a88f4240ebe4ad995_compressed.jpg',
    ],
    previewImages: [
      'http://89.108.71.146:8000/IMGS_Preview/preview_IMG_1408_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_IMG_1413_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_IMG_1411_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_IMG_1407_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_IMG_1401_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_IMG_n98898b_ol1402_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_d7c654b0a0a044ff865b5339df334bac_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_ede6185ce246396b05939b4b20fc679b_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_d50e0ff2f6b4901f518326a018e7013a_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_d7c4224584b0cd7a88f4240ebe4ad995_compressed.jpg',
    ],
    price: 11000,
    priceGroup: 'Распродажа 50%',
    productId: '30936',
    title: 'Футболка ESCADA SPORT',
  },
  {
    brandImage:
      'http://89.108.71.146:8000/CAT_logo/164/escada_sportapr_vector_2662.png',
    brandName: 'ESCADA SPORT',
    collection: undefined,
    isAvailable: true,
    largeImages: [
      'http://89.108.71.146:8000/IMGS_Path/IMG_1408_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/IMG_1413_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/IMG_1411_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/IMG_1407_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/IMG_1401_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/IMG_n98898b_ol1402_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/d7c654b0a0a044ff865b5339df334bac_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/ede6185ce246396b05939b4b20fc679b_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/d50e0ff2f6b4901f518326a018e7013a_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/d7c4224584b0cd7a88f4240ebe4ad995_compressed.jpg',
    ],
    previewImages: [
      'http://89.108.71.146:8000/IMGS_Preview/preview_IMG_1408_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_IMG_1413_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_IMG_1411_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_IMG_1407_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_IMG_1401_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_IMG_n98898b_ol1402_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_d7c654b0a0a044ff865b5339df334bac_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_ede6185ce246396b05939b4b20fc679b_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_d50e0ff2f6b4901f518326a018e7013a_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_d7c4224584b0cd7a88f4240ebe4ad995_compressed.jpg',
    ],
    price: 11000,
    priceGroup: 'Распродажа 50%',
    productId: '30937',
    title: 'Футболка ESCADA SPORT',
  },
  {
    brandImage:
      'http://89.108.71.146:8000/CAT_logo/164/escada_sportapr_vector_2662.png',
    brandName: 'ESCADA SPORT',
    collection: undefined,
    isAvailable: true,
    largeImages: [
      'http://89.108.71.146:8000/IMGS_Path/previewtsuk_IMG_9109_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/IMG_tsuk9110_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/IMG_1500_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/IMG_1497_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/021cdb5885b74c344ff98924fe89eab8_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/ea404f3dd3d30a369da027adb959315d_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/3695d7cb8a276d99be6a3305b4e6b5aa_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Path/8e1efa948e0c175a0e38dcb18c9570f9_compressed.jpg',
    ],
    previewImages: [
      'http://89.108.71.146:8000/IMGS_Preview/preview_previewtsuk_IMG_9109_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_IMG_tsuk9110_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_IMG_1500_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_IMG_1497_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_021cdb5885b74c344ff98924fe89eab8_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_ea404f3dd3d30a369da027adb959315d_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_3695d7cb8a276d99be6a3305b4e6b5aa_compressed.jpg',
      'http://89.108.71.146:8000/IMGS_Preview/preview_8e1efa948e0c175a0e38dcb18c9570f9_compressed.jpg',
    ],
    price: 24400,
    priceGroup: 'Распродажа 30%',
    productId: '30868',
    title: 'Куртка ESCADA SPORT',
  },
]
