import React, {useMemo, useRef} from 'react'

import {yupResolver} from '@hookform/resolvers/yup'
import {FormProvider, useForm} from 'react-hook-form'
import * as yup from 'yup'

import {FastBuy, FastBuyRefType} from 'src/components/FastBuy'
import {useTypedNavigation, useTypedRoute} from 'src/hooks'
import {vibration} from 'src/services/vibration'
import {useCreateFastOrderMutation} from 'src/store/shopApi'
import {UNKNOWN_ERROR_MSG} from 'src/variables'

const fastBuySchema = yup
  .object({
    telephone: yup.string().trim().required('Обязательное поле').trim(),
    address: yup.string().required('Обязательное поле'),
    name: yup
      .string()
      .required('Обязательное поле')
      .min(2, 'Слишком короткое имя')
      .max(35, 'Имя слишком длинное')
      .trim(),
  })
  .required()
type FastBuySchemaType = yup.InferType<typeof fastBuySchema>

export const FastBuyScreen = () => {
  const fastBuyRef = useRef<FastBuyRefType>(null)
  const form = useForm<FastBuySchemaType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(fastBuySchema),
  })
  const {navigate} = useTypedNavigation()

  const [createFastOrder, {isLoading}] = useCreateFastOrderMutation()
  const {product} = useTypedRoute<'fastBuy'>().params

  const onSubmit = useMemo(
    () =>
      form.handleSubmit(
        async ({name, address, telephone}: FastBuySchemaType) => {
          const order: any = await createFastOrder({
            productVariantId: product.variant.uniqueId,
            address,
            name,
            phoneNumber: telephone,
          })
          const error = order?.error?.data?.error || order?.data?.errorMessage
          const formUrl = order?.data?.formUrl
          if (formUrl) {
            vibration.success()
            form.reset()
            fastBuyRef.current?.setError('')
            navigate('payment', {
              formUrl,
              orderFastBuyId: order?.data?.orderId,
            })
          } else if (error && String(error).toLowerCase() !== 'success') {
            vibration.error()
            fastBuyRef.current?.setError(error)
          } else {
            vibration.error()
            fastBuyRef.current?.setError(UNKNOWN_ERROR_MSG)
          }
        },
        error => {
          vibration.error()
          console.log('😭 - error:', error)
        },
      ),
    [],
  )

  return (
    <FormProvider {...form}>
      <FastBuy isLoading={isLoading} ref={fastBuyRef} onSubmit={onSubmit} />
    </FormProvider>
  )
}
