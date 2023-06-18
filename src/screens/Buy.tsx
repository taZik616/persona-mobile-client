import React, {useEffect, useMemo, useRef} from 'react'

import {yupResolver} from '@hookform/resolvers/yup'
import {FormProvider, useForm} from 'react-hook-form'
import {Linking} from 'react-native'
import * as yup from 'yup'

import {Buy} from 'src/components/Buy'
import {useTypedNavigation} from 'src/hooks'
import {vibration} from 'src/services/vibration'
import {store, useTypedDispatch} from 'src/store'
import {removeItemFromBasketByIds} from 'src/store/basketSlice'
import {useCreateOrderMutation} from 'src/store/shopApi'
import {UNKNOWN_ERROR_MSG} from 'src/variables'

const addressSchema = yup
  .object({
    address: yup.string().required('Обязательное поле'),
  })
  .required()

type AddressSchemaType = yup.InferType<typeof addressSchema>

export const BuyScreen = () => {
  const [createOrder] = useCreateOrderMutation()
  const componentRef = useRef<any>(null)
  const {navigate, ...nav} = useTypedNavigation()
  const dispatch = useTypedDispatch()

  const form = useForm<AddressSchemaType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(addressSchema),
  })

  useEffect(() => {
    const sub = Linking.addEventListener('url', ({url}) => {
      if (url.split('://')[1].includes('order-pay-failed')) {
        componentRef.current?.setRequestError('Оплата заказа не прошла')
      } else if (url.split('://')[1].includes('order-pay-success')) {
        const {selectedItemIds} = store.getState().basket
        dispatch(removeItemFromBasketByIds(selectedItemIds))
        nav.reset({
          routes: [
            {
              name: 'home',
              params: {
                screen: 'homeProfile',
              },
            },
          ],
        })
        navigate('orders')
      }
    })
    return sub.remove
  }, [])

  const onSubmit = useMemo(
    () =>
      form.handleSubmit(
        async ({address}: AddressSchemaType) => {
          const {selectedItemIds, promocode} = store.getState().basket
          const productVariantIds = selectedItemIds
            .map(a => a.split('-')[1])
            .join(',')
          const order: any = await createOrder({
            productVariantIds,
            promocode,
            address,
          })

          const error = order?.error?.data?.error || order?.data?.errorMessage
          const url = order?.data?.formUrl
          if (url) {
            vibration.success()
            form.reset()
            componentRef.current?.setRequestError('')
            Linking.openURL(url)
          } else if (error && String(error).toLowerCase() !== 'success') {
            vibration.error()
            componentRef.current?.setRequestError(error)
          } else {
            vibration.error()
            componentRef.current?.setRequestError(UNKNOWN_ERROR_MSG)
          }
        },
        (error: any) => {
          vibration.error()
          console.log('😭 - error:', error)
        },
      ),
    [],
  )

  return (
    <FormProvider {...form}>
      <Buy ref={componentRef} onSubmit={onSubmit} />
    </FormProvider>
  )
}
