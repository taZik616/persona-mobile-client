import React, {forwardRef, memo, useImperativeHandle, useState} from 'react'

import {ScrollView, StyleSheet, View} from 'react-native'

import {useScreenBlockPortrait, useTypedRoute} from 'src/hooks'
import {useDeliveryPriceQuery} from 'src/store/shopApi'
import {Color} from 'src/themes'

import {
  Button,
  FormTextInput,
  Header,
  SafeLandscapeView,
  Spacer,
  Text,
} from 'ui/index'

import {CostLine} from './CostLine'

interface BuyProps {
  onSubmit?: () => void
}

export const Buy = memo(
  forwardRef<any, BuyProps>(({onSubmit}, ref) => {
    useScreenBlockPortrait()
    const {priceWithPersonalDiscount, priceWithoutPersonalDiscount} =
      useTypedRoute<'buy'>().params
    const [requestError, setRequestError] = useState('')

    useImperativeHandle(ref, () => ({
      setRequestError,
    }))

    const {currentData: deliveryPrice} = useDeliveryPriceQuery({})

    return (
      <>
        <Header title="Оформление" showBack hideSearch hideBasket />
        <ScrollView style={styles.scrollContainer}>
          <SafeLandscapeView safeArea>
            <Spacer height={20} />
            {/* <ViewToggler options={options} /> */}
            <Spacer height={16} />
            <FormTextInput placeholder="Адрес доставки" name="address" />
            <Spacer height={16} />
            {requestError ? (
              <Text color={Color.textRed1} gp1>
                {requestError}
              </Text>
            ) : (
              <></>
            )}
            {/* <TouchableOpacity
            onPress={onPressAddCard}
            style={styles.borderedContainer}>
            <Text numberOfLines={1} gp4>
              Добавить карту лояльности или подарочную карту
            </Text>
          </TouchableOpacity> */}
          </SafeLandscapeView>
        </ScrollView>
        <SafeLandscapeView safeArea>
          {deliveryPrice && <CostLine name="Доставка" cost={deliveryPrice} />}
          <CostLine name="Итого" cost={priceWithoutPersonalDiscount} />
          <CostLine
            name="Скидка"
            cost={priceWithoutPersonalDiscount - priceWithPersonalDiscount}
          />
          <CostLine
            name="Итого к оплате"
            cost={priceWithPersonalDiscount + (deliveryPrice || 0)}
          />
          <Spacer height={12} />
          <View style={styles.flexRow}>
            <Button onPress={onSubmit}>Оплатить по карте</Button>
            {/* <Spacer width={16} />
          <Button variant="outline">Another</Button> */}
          </View>
        </SafeLandscapeView>
        <Spacer withBottomInsets height={28} />
      </>
    )
  }),
)

// const options = [
//   {
//     value: 'delivery',
//     title: 'В наличии',
//   },
//   {
//     value: '?',
//     title: '?????',
//   },
// ]

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  // borderedContainer: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   padding: 16,
  //   borderWidth: 1,
  //   borderColor: Color.primaryGray,
  //   borderRadius: 8,
  // },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
