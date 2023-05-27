import React, {memo, useMemo, useState} from 'react'

import {StyleSheet, View} from 'react-native'

import {useTypedRoute} from 'src/hooks'
import {useProductDetailQuery} from 'src/store/shopApi/shopApi'
import {ProductDetailInfo} from 'src/types'

import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'
import {ViewToggler} from '../ui/ViewToggler'

export const DetailsSection = memo(() => {
  const {productId} = useTypedRoute<'productDetail'>().params ?? {}
  const {currentData, isLoading} = useProductDetailQuery(productId)
  const [tab, setTab] = useState(options[0].value)
  const detailsData = currentData as ProductDetailInfo
  const {description, podklad, brand, manufacturer, country, sostav} =
    detailsData || {}

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
          </View>
        )
      default:
        return <></>
    }
  }, [tab, isLoading])

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
  {
    title: 'Возврат',
    value: 'return',
  },
]
