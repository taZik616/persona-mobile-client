import React, {useMemo, useRef} from 'react'

import {yupResolver} from '@hookform/resolvers/yup'
import {FormProvider, useForm} from 'react-hook-form'
import * as yup from 'yup'

import {Buy} from 'src/components/Buy'
import {useTypedNavigation} from 'src/hooks'
import {vibration} from 'src/services/vibration'
import {store} from 'src/store'
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
  const {navigate} = useTypedNavigation()
  const form = useForm<AddressSchemaType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(addressSchema),
  })

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
          const formUrl = order?.data?.formUrl
          if (formUrl) {
            vibration.success()
            form.reset()
            componentRef.current?.setRequestError('')
            navigate('payment', {formUrl})
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
