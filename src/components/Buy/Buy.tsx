import React, {forwardRef, memo, useImperativeHandle, useState} from 'react'

import {ScrollView, StyleSheet, View} from 'react-native'

import {useScreenBlockPortrait, useTypedRoute} from 'src/hooks'
import {useDeliveryPriceQuery} from 'src/store/shopApi'
import {Color} from 'src/themes'

import {
  Button,
  FormTextInput,
  Header,
  RadioSelect,
  SafeLandscapeView,
  Spacer,
  Text,
} from 'ui/index'

import {CostLine} from './CostLine'

interface BuyProps {
  onSubmit?: (isPaymentOnline: boolean) => void
  isLoading?: boolean
}

export const Buy = memo(
  forwardRef<any, BuyProps>(({onSubmit, isLoading}, ref) => {
    useScreenBlockPortrait()
    const {priceWithPersonalDiscount, priceWithoutPersonalDiscount} =
      useTypedRoute<'buy'>().params
    const [requestError, setRequestError] = useState('')
    const [paymentMethod, setPaymentMethod] = useState<
      'payment-upon-delivery' | 'online-payment'
    >('online-payment')

    useImperativeHandle(ref, () => ({
      setRequestError,
    }))

    const {currentData: deliveryPrice} = useDeliveryPriceQuery(
      Math.round(priceWithPersonalDiscount),
    )

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
            <Spacer height={6} />
            <RadioSelect
              disableTopMargin
              hideLine
              text="Оплатить онлайн"
              value="online-payment"
              // @ts-ignore
              onPress={setPaymentMethod}
              isSelected={paymentMethod === 'online-payment'}
            />
            <Spacer height={4} />
            <RadioSelect
              disableTopMargin
              hideLine
              text="Оплата при получении курьеру"
              value="payment-upon-delivery"
              // @ts-ignore
              onPress={setPaymentMethod}
              isSelected={paymentMethod === 'payment-upon-delivery'}
            />
          </SafeLandscapeView>
        </ScrollView>
        <SafeLandscapeView safeArea>
          {deliveryPrice !== null && (
            <CostLine
              isFree={!deliveryPrice}
              name="Доставка"
              cost={deliveryPrice}
            />
          )}
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
            <Button
              isLoading={isLoading}
              onPress={() => onSubmit?.(paymentMethod === 'online-payment')}>
              Оплатить по карте
            </Button>
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
