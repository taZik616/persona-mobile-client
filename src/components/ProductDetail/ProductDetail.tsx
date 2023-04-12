import React from 'react'

import {ScrollView, StyleSheet, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {Color} from 'src/themes'
import {ProductDetailInfo} from 'src/types'

import {Header} from '../ui/Header'
import {ShareIcon, StarEmptyIcon} from '../ui/icons/common'
import {Img} from '../ui/Img'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {Swiper} from '../ui/Swiper'
import {Text} from '../ui/Text'
import {ViewToggler} from '../ui/ViewToggler'

interface ProductDetailProps extends Partial<ProductDetailInfo> {
  onPressBack?: () => void
}

export const ProductDetail = ({onPressBack, ...item}: ProductDetailProps) => {
  const {largeImages, priceGroup, collection, brandImage, title, price} = item
  const {bottom} = useSafeAreaInsets()
  return (
    <>
      <Header showBack onPressBack={onPressBack} hideSearch />
      <ScrollView>
        <Spacer height={16} />
        {largeImages && <Swiper type="big-image" images={largeImages} />}
        <Spacer height={8} />
        <SafeLandscapeView safeArea>
          <Text center color={Color.primary} gp1>{`${priceGroup ?? ''}${
            collection ? ' | ' + collection : ''
          }`}</Text>
          <Spacer height={8} />
          <View style={styles.row}>
            <ShareIcon />
            <View style={styles.headInfoContainer}>
              {brandImage && (
                <>
                  <Img maxHeight={45} uri={brandImage} />
                  <Spacer height={10} />
                </>
              )}
              <Text gp4>{title}</Text>
              <Spacer height={6} />
              <Text gp4>{price}</Text>
            </View>
            <StarEmptyIcon height={20} />
          </View>
          <Spacer height={16} />
        </SafeLandscapeView>
        <ViewToggler options={options} />
        <Spacer height={bottom + 14} />
      </ScrollView>
    </>
  )
}

const options = [
  {
    title: 'Описание',
    value: 'desc',
  },
  {
    title: 'Информация',
    value: 'info',
  },
  {
    title: 'Доставка',
    value: 'delivery',
  },
  {
    title: 'Возврат',
    value: 'return',
  },
]

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
  },
  headInfoContainer: {
    flex: 1,
    alignItems: 'center',
  },
})
