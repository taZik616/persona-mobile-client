import React, {useCallback, useMemo, useRef} from 'react'

import {yupResolver} from '@hookform/resolvers/yup'
import {FormProvider, useForm} from 'react-hook-form'
import * as yup from 'yup'

import {
  Basket,
  PromoCodeEntry,
  PromoCodeEntryRefType,
} from 'src/components/Basket'
import {useTypedNavigation} from 'src/hooks'
import {vibration} from 'src/services/vibration'
import {ProductPreviewInfo} from 'src/types'

const promoCodeSchema = yup
  .object({
    promo: yup.string().required('Введите промокод'),
  })
  .required()

type PromoCodeType = yup.InferType<typeof promoCodeSchema>

export const BasketScreen = () => {
  const {navigate} = useTypedNavigation()

  const promoCodeEntryRef = useRef<PromoCodeEntryRefType>(null)
  const form = useForm<PromoCodeType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(promoCodeSchema),
  })
  // const dispatch = useTypedDispatch()

  const onPressBasketItem = (item: ProductPreviewInfo) => {
    navigate('productDetail', {item, productId: item.productId})
  }

  const onChangeSelect = (item: ProductPreviewInfo, isSelected: boolean) => {
    console.log('🚀 - onChangeSelect:', item.productId, '-', isSelected)
  }

  const onSubmitPromoCode = useMemo(
    () =>
      form.handleSubmit(
        async ({promo}: PromoCodeType) => {
          vibration.success()
          form.resetField('promo')
          console.log('🚀 - promo:', promo)
          promoCodeEntryRef.current?.close?.()
          promoCodeEntryRef.current?.setError('')
        },
        (error: any) => {
          vibration.error()
          console.log('😭 - error:', error)
        },
      ),
    [],
  )
  const onPressPromoEntry = useCallback(() => {
    promoCodeEntryRef.current?.open?.()
  }, [])

  return (
    <>
      <Basket
        onPressPromoEntry={onPressPromoEntry}
        onChangeSelect={onChangeSelect}
        onPressBasketItem={onPressBasketItem}
      />
      <FormProvider {...form}>
        <PromoCodeEntry onSubmit={onSubmitPromoCode} ref={promoCodeEntryRef} />
      </FormProvider>
    </>
  )
}
