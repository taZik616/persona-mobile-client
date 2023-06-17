import React, {useCallback, useMemo, useRef} from 'react'

import {APP_API_URL} from '@env'
import {yupResolver} from '@hookform/resolvers/yup'
import {useFocusEffect} from '@react-navigation/native'
import axios, {AxiosError} from 'axios'
import {FormProvider, useForm} from 'react-hook-form'
import * as yup from 'yup'

import {
  Basket,
  PromoCodeEntry,
  PromoCodeEntryRefType,
} from 'src/components/Basket'
import {captureException} from 'src/helpers'
import {useTypedNavigation} from 'src/hooks'
import {vibration} from 'src/services/vibration'
import {
  selectBasketPromocode,
  store,
  useTypedDispatch,
  useTypedSelector,
} from 'src/store'
import {
  personalDiscountBasketCalc,
  setBasketPromocode,
} from 'src/store/basketSlice'
import {ProductPreviewInfo} from 'src/types'

const promoCodeSchema = yup
  .object({
    promo: yup.string().required('Введите промокод'),
  })
  .required()

type PromoCodeType = yup.InferType<typeof promoCodeSchema>

export const BasketScreen = () => {
  const {navigate} = useTypedNavigation()
  const dispatch = useTypedDispatch()
  const promocode = useTypedSelector(selectBasketPromocode)

  const promoCodeEntryRef = useRef<PromoCodeEntryRefType>(null)
  const form = useForm<PromoCodeType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {promo: promocode},
    resolver: yupResolver(promoCodeSchema),
  })

  const onPressBasketItem = (product: ProductPreviewInfo) => {
    navigate('productDetail', {product, productId: product.productId})
  }

  useFocusEffect(
    useCallback(() => {
      dispatch(personalDiscountBasketCalc)
    }, [promocode]),
  )

  const onSubmitPromoCode = useMemo(
    () =>
      form.handleSubmit(
        async ({promo}: PromoCodeType) => {
          try {
            const {items} = store.getState().basket
            const token = store.getState().profile.authToken ?? ''
            const res = await axios.get(
              `${APP_API_URL}/api/v1/order-personal-discount-calc`,
              {
                params: {
                  productVariantIds: items
                    .map(a => a.variant.uniqueId)
                    .join(','),
                  promocode: promo,
                },
                headers: {Authorization: token ? `Token ${token}` : ''},
              },
            )
            const products = res.data?.products
            if (products) {
              vibration.success()
              promoCodeEntryRef.current?.setError('')
              dispatch(setBasketPromocode(promo))
              promoCodeEntryRef.current?.close?.()
            }
          } catch (error) {
            if (axios.isAxiosError(error)) {
              const axiosError = error as AxiosError
              const errorMessage = (axiosError.response?.data as any)?.error
              promoCodeEntryRef.current?.setError(errorMessage)
            } else {
              captureException(error)
            }
          }
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

  const onPressRemovePromo = useCallback(() => {
    dispatch(setBasketPromocode(undefined))
  }, [])

  return (
    <>
      <Basket
        onPressPromoEntry={onPressPromoEntry}
        onPressBasketItem={onPressBasketItem}
        onPressRemovePromo={onPressRemovePromo}
      />
      <FormProvider {...form}>
        <PromoCodeEntry onSubmit={onSubmitPromoCode} ref={promoCodeEntryRef} />
      </FormProvider>
    </>
  )
}
