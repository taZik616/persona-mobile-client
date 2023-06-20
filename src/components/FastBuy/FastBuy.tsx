import React, {forwardRef, memo, useImperativeHandle, useState} from 'react'

import {useFormContext} from 'react-hook-form'
import {ScrollView} from 'react-native'

import {useTypedRoute} from 'src/hooks'
import {useDeliveryPriceQuery} from 'src/store/shopApi'
import {Color} from 'src/themes'

import {ProductCardRow} from 'ui/cards'
import {
  Button,
  FormTextInput,
  Header,
  KeyboardSafeArea,
  SafeLandscapeView,
  Spacer,
  Text,
} from 'ui/index'

import {CostLine} from '../Buy/CostLine'

interface FastBuyProps {
  onSubmit?: () => void
  isLoading?: boolean
}

export interface FastBuyRefType {
  setError: (err: string) => void
}

export const FastBuy = memo(
  forwardRef<FastBuyRefType, FastBuyProps>(({onSubmit, isLoading}, ref) => {
    const {product} = useTypedRoute<'fastBuy'>().params
    const [error, setError] = useState('')
    const {currentData: deliveryPrice} = useDeliveryPriceQuery({})

    const {
      formState: {isValid},
    } = useFormContext()

    useImperativeHandle(ref, () => ({
      setError,
    }))

    return (
      <KeyboardSafeArea>
        <Header title="Быстрая покупка" showBack hideSearch hideBasket />
        <ScrollView>
          <SafeLandscapeView safeArea maxWidth={700}>
            <Spacer height={20} />
            <ProductCardRow {...product} />
            <Spacer height={16} />
            <Text gp2>Контактная информация</Text>
            <Spacer height={16} />
            <FormTextInput
              placeholder="Имя"
              nextField="telephone"
              name="name"
            />
            <Spacer height={16} />
            <FormTextInput
              keyboardType="phone-pad"
              placeholder="Телефон"
              nextField="address"
              name="telephone"
            />
            <Spacer height={16} />
            <FormTextInput placeholder="Адрес" name="address" />
            <Spacer height={16} />
            {deliveryPrice && (
              <>
                <CostLine name="Доставка" cost={deliveryPrice} />
                <CostLine
                  name="Итого к оплате"
                  cost={
                    product.variant.price -
                    (product.variant.price / 100) *
                      (product.variant.discountPercent || 0) +
                    (deliveryPrice || 0)
                  }
                />
                <Spacer height={8} />
              </>
            )}

            <Button
              isLoading={isLoading}
              disabled={!isValid}
              onPress={onSubmit}
              gp5>
              Купить
            </Button>
            <Spacer height={8} />
            {error ? (
              <Text center color={Color.textRed1} gp1>
                {error}
              </Text>
            ) : (
              <></>
            )}
            <Spacer withBottomInsets height={30} />
          </SafeLandscapeView>
        </ScrollView>
      </KeyboardSafeArea>
    )
  }),
)
