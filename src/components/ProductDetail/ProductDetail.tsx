import React, {memo} from 'react'

import {ScrollView, StyleSheet, View} from 'react-native'
import {ShopBagLightIcon} from 'ui/icons/common'
import {
  Button,
  Header,
  Img,
  SafeLandscapeView,
  Spacer,
  StarProduct,
  Swiper,
  Text,
} from 'ui/index'

import {cleanNumber} from 'src/helpers'
import {Color} from 'src/themes'
import {ProductPreviewInfo} from 'src/types'

import {DetailsSection} from './DetailsSection'

interface ProductDetailProps extends ProductPreviewInfo {
  onPressFastBuy?: () => void
  onPressAddToBasket?: () => void
}

export const ProductDetail = memo(
  ({onPressFastBuy, onPressAddToBasket, ...item}: ProductDetailProps) => {
    const {
      images,
      priceGroup,
      collection,
      brand,
      productName,
      price,
      discountPercent,
    } = item

    return (
      <>
        <Header showBack hideSearch />
        <ScrollView>
          <Spacer height={16} />
          {images && (
            <Swiper
              type="big-image"
              images={images.map(a => a.originalImage)}
            />
          )}
          <Spacer height={8} />
          <SafeLandscapeView safeArea>
            <Text center color={Color.primary} gp1>{`${priceGroup ?? ''}${
              collection ? ' | ' + collection : ''
            }`}</Text>
            <Spacer height={8} />
            <View style={styles.row}>
              <Spacer width={24} />
              <View style={styles.headInfoContainer}>
                {brand?.logo && (
                  <>
                    <Img maxHeight={35} uri={brand.logo} />
                    <Spacer height={10} />
                  </>
                )}
                <Text gp4>{productName}</Text>
                <Spacer height={6} />
                <View style={styles.flexRow}>
                  {discountPercent ? (
                    <>
                      <Text gp5>{cleanNumber(price, ' ', 0)} ₽</Text>
                      <Spacer width={16} />
                    </>
                  ) : (
                    <></>
                  )}
                  <Text
                    color={Color.primaryGray}
                    style={styles.priceWithoutDiscount}
                    gp5>
                    {cleanNumber(price, ' ', 0, discountPercent)} ₽
                  </Text>
                </View>
              </View>
              <StarProduct item={item} />
            </View>
            <Spacer height={16} />
          </SafeLandscapeView>
          <DetailsSection />
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
  },
)

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
  priceWithoutDiscount: {
    textDecorationLine: 'line-through',
    textDecorationColor: Color.textBase1,
  },
})
