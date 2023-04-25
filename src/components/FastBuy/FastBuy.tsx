import React, {forwardRef, memo, useImperativeHandle, useState} from 'react'

import {useFormContext} from 'react-hook-form'
import {ScrollView} from 'react-native'

import {useTypedRoute} from 'src/hooks'
import {Color} from 'src/themes'

import {Button} from '../ui/Button'
import {FormTextInput} from '../ui/FormTextInput'
import {Header} from '../ui/Header'
import {KeyboardSafeArea} from '../ui/KeyboardSafeArea'
import {ProductCardRow} from '../ui/ProductCardRow'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'

interface FastBuyProps {
  onSubmit?: () => void
}

export interface FastBuyRefType {
  setError: (err: string) => void
}

export const FastBuy = memo(
  forwardRef<FastBuyRefType, FastBuyProps>(({onSubmit}, ref) => {
    const {product} = useTypedRoute<'fastBuy'>().params
    const [error, setError] = useState('')

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
              name="telephone"
            />
            <Spacer height={16} />
            <Button disabled={!isValid} onPress={onSubmit} gp5>
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
