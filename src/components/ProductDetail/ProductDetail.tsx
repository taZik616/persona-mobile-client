import React from 'react'

import {ScrollView, StyleSheet, View} from 'react-native'

import {Color} from 'src/themes'
import {ProductPreviewInfo} from 'src/types'

import {Button} from '../ui/Button'
import {Header} from '../ui/Header'
import {ShopBagLightIcon} from '../ui/icons/common'
import {Img} from '../ui/Img'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {StarProduct} from '../ui/StarProduct'
import {Swiper} from '../ui/Swiper'
import {Text} from '../ui/Text'
import {ViewTogglerWHM} from '../ui/ViewToggler'
interface ProductDetailProps extends ProductPreviewInfo {
  onPressBack?: () => void
  onPressFastBuy?: () => void
  onPressAddToBasket?: () => void
}

export const ProductDetail = ({
  onPressBack,
  onPressFastBuy,
  onPressAddToBasket,
  ...item
}: ProductDetailProps) => {
  const {largeImages, priceGroup, collection, brandImage, title, price} = item

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
            <Spacer width={24} />
            <View style={styles.headInfoContainer}>
              {brandImage && (
                <>
                  <Img maxHeight={35} uri={brandImage} />
                  <Spacer height={10} />
                </>
              )}
              <Text gp4>{title}</Text>
              <Spacer height={6} />
              <Text gp4>{price}</Text>
            </View>
            <StarProduct item={item} />
          </View>
          <Spacer height={16} />
        </SafeLandscapeView>
        <ViewTogglerWHM options={options} />
        <SafeLandscapeView safeArea>
          <Spacer height={22} />
          <Text center cg2>
            С ЧЕМ НОСИТЬ
          </Text>
          <Spacer height={18} />
          <View style={styles.flexRow}>
            <Button onPress={onPressFastBuy} variant="outline">
              Быстрая покупка
            </Button>
            <Spacer width={16} />
            <Button
              onPress={onPressAddToBasket}
              rightIcon={<ShopBagLightIcon />}>
              В корзину
            </Button>
          </View>
        </SafeLandscapeView>
        <Spacer withBottomInsets height={50} />
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
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headInfoContainer: {
    flex: 1,
    alignItems: 'center',
  },
})
