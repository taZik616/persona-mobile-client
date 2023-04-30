import React from 'react'

import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native'

import {useScreenBlockPortrait} from 'src/hooks'
import {selectBasketSelectedItems, useTypedSelector} from 'src/store'
import {Color} from 'src/themes'

import {CostLine} from './CostLine'

import {Button} from '../ui/Button'
import {FormTextInput} from '../ui/FormTextInput'
import {Header} from '../ui/Header'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'
import {ViewToggler} from '../ui/ViewToggler'

interface BuyProps {
  onPressAddCard?: () => void
  onSubmit?: () => void
}

export const Buy = ({onPressAddCard, onSubmit}: BuyProps) => {
  useScreenBlockPortrait()
  const products = useTypedSelector(selectBasketSelectedItems)

  const orderPrice = products.reduce((acc, it) => acc + it.price, 0)
  const deliveryPrice = 500
  const discount = 200
  const totalPrice = orderPrice + deliveryPrice - discount

  return (
    <>
      <Header title="Оформление" showBack hideSearch hideBasket />
      <ScrollView style={styles.scrollContainer}>
        <SafeLandscapeView safeArea>
          <Spacer height={20} />
          <ViewToggler options={options} />
          <Spacer height={16} />
          <FormTextInput placeholder="Адрес доставки" name="address" />
          <Spacer height={16} />
          <TouchableOpacity
            onPress={onPressAddCard}
            style={styles.borderedContainer}>
            <Text numberOfLines={1} gp4>
              Добавить карту лояльности или подарочную карту
            </Text>
          </TouchableOpacity>
        </SafeLandscapeView>
      </ScrollView>
      <SafeLandscapeView safeArea>
        <CostLine name="Доставка" cost={deliveryPrice} />
        <CostLine name="Итого" cost={orderPrice} />
        <CostLine name="Скидка" cost={discount} />
        <CostLine name="Итого к оплате" cost={totalPrice} />
        <Spacer height={12} />
        <View style={styles.flexRow}>
          <Button onPress={onSubmit}>Банковская карта</Button>
          <Spacer width={16} />
          <Button variant="outline">Another</Button>
        </View>
      </SafeLandscapeView>
      <Spacer withBottomInsets height={28} />
    </>
  )
}

const options = [
  {
    value: 'delivery',
    title: 'В наличии',
  },
  {
    value: '?',
    title: '?????',
  },
]

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  borderedContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: Color.primaryGray,
    borderRadius: 8,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
