import React, {memo} from 'react'

import {ScrollView, StyleSheet, View} from 'react-native'

import {cleanNumber} from 'src/helpers'
import {useTypedNavigation} from 'src/hooks'
import {useMightBeInterestedQuery} from 'src/store/shopApi'
import {Color} from 'src/themes'
import {ProductPreviewInfo} from 'src/types'

import {HorizontalProductsList} from 'ui/horizontal-lists'
import {ShopBagLightIcon} from 'ui/icons/common'
import {
  Button,
  FirstBuyInAppBanner,
  Header,
  Img,
  SafeLandscapeView,
  Spacer,
  StarProduct,
  Swiper,
  Text,
} from 'ui/index'

import {DetailsSection} from './DetailsSection'

interface ProductDetailProps extends ProductPreviewInfo {
  onPressFastBuy?: () => void
  onPressAddToBasket?: () => void
}

export const ProductDetail = memo(
  ({onPressFastBuy, onPressAddToBasket, ...item}: ProductDetailProps) => {
    const {
      images,
      collection,
      brand,
      productName,
      price,
      productId,
      discountPercent,
    } = item

    const recommendation = useMightBeInterestedQuery({
      productId,
    })

    const {push} = useTypedNavigation()
    const onPressProduct = (product: ProductPreviewInfo) => {
      push('productDetail', {product, productId: product.productId})
    }

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
            <Text center color={Color.primary} gp1>
              {collection}
            </Text>
            <Spacer height={8} />
            <View style={styles.row}>
              <Spacer width={24} />
              <View style={styles.headInfoContainer}>
                {brand?.logo ? (
                  <>
                    <Img maxHeight={35} uri={brand.logo} />
                    <Spacer height={10} />
                  </>
                ) : brand?.name ? (
                  <View style={styles.brandName}>
                    <Text numberOfLines={1} center gp1>
                      {brand?.name?.toUpperCase()}
                    </Text>
                  </View>
                ) : (
                  <Spacer height={8} />
                )}
                <Text gp4>{productName}</Text>
                <Spacer height={6} />
                <View style={styles.flexRow}>
                  {discountPercent ? (
                    <>
                      <Text
                        color={Color.primaryGray}
                        style={styles.priceWithoutDiscount}
                        gp5>
                        {cleanNumber(price, ' ', 0)} ₽
                      </Text>
                      <Spacer width={16} />
                    </>
                  ) : (
                    <></>
                  )}
                  <Text gp5>
                    {cleanNumber(price, ' ', 0, discountPercent)} ₽
                  </Text>
                </View>
              </View>
              <StarProduct item={item} />
            </View>
            <Spacer height={16} />
            <FirstBuyInAppBanner spaceBottom={16} />
          </SafeLandscapeView>
          <DetailsSection />
          <Spacer height={22} />
          <Text center cg2>
            С ЧЕМ НОСИТЬ
          </Text>
          <Spacer height={16} />
          <HorizontalProductsList
            onPressItem={onPressProduct}
            isLoading={!recommendation.currentData}
            products={recommendation.currentData}
          />
          <Spacer height={32} />
          <SafeLandscapeView safeArea>
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
  brandName: {
    width: '100%',
    height: 35,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
})
