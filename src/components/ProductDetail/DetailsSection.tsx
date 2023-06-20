import React, {memo, useMemo, useState} from 'react'

import {StyleSheet, View} from 'react-native'

import {cleanNumber} from 'src/helpers'
import {useTypedRoute} from 'src/hooks'
import {
  useDeliveryPriceQuery,
  useProductDetailQuery,
} from 'src/store/shopApi/shopApi'
import {Color} from 'src/themes'
import {ProductDetailInfo} from 'src/types'

import {SafeLandscapeView, Spacer, Text, ViewToggler} from 'ui/index'

export const DetailsSection = memo(() => {
  const {productId} = useTypedRoute<'productDetail'>().params ?? {}
  const {currentData, isLoading} = useProductDetailQuery(productId)
  const [tab, setTab] = useState(options[0].value)
  const detailsData = currentData as ProductDetailInfo
  const {description, podklad, article, brand, manufacturer, country, sostav} =
    detailsData || {}
  const {currentData: deliveryPrice} = useDeliveryPriceQuery({})

  const content = useMemo(() => {
    switch (tab) {
      case 'desc':
        return description ? (
          <Text gp4>{description}</Text>
        ) : isLoading ? (
          <></>
        ) : (
          <Text gp4>Для данного товара отсутствует описание</Text>
        )
      case 'info':
        return (
          <View style={styles.gap}>
            {brand?.name ? <Text gp4>Бренд: {brand?.name}</Text> : <></>}
            {sostav ? <Text gp4>Состав: {sostav}</Text> : <></>}
            {country ? <Text gp4>Страна: {country}</Text> : <></>}
            {manufacturer ? (
              <Text gp4>Производство: {manufacturer}</Text>
            ) : (
              <></>
            )}
            {podklad ? <Text gp4>Подклад: {podklad}</Text> : <></>}
            {article ? (
              <View style={styles.articleContainer}>
                <Text gp4>Артикул: </Text>
                <Text color={Color.primary} selectable gp4>
                  {article}
                </Text>
              </View>
            ) : (
              <></>
            )}
          </View>
        )
      case 'delivery':
        return (
          <View style={styles.gap}>
            {deliveryPrice ? (
              <Text gp4>
                Цена доставки: {cleanNumber(deliveryPrice, ' ', 0)} ₽
              </Text>
            ) : (
              <></>
            )}
          </View>
        )
      default:
        return <></>
    }
  }, [tab, isLoading, deliveryPrice])

  return (
    <SafeLandscapeView safeArea>
      <ViewToggler onEndToggle={setTab} options={options} />
      <Spacer height={16} />
      {content}
    </SafeLandscapeView>
  )
})

const styles = StyleSheet.create({
  gap: {
    rowGap: 6,
  },
  articleContainer: {
    flexDirection: 'row',
  },
})

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
]
