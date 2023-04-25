import React, {useCallback, useMemo} from 'react'

import {yupResolver} from '@hookform/resolvers/yup'
import {FormProvider, useForm} from 'react-hook-form'
import * as yup from 'yup'

import {Buy} from 'src/components/Buy'
import {useTypedNavigation} from 'src/hooks'
import {vibration} from 'src/services/vibration'

const addressSchema = yup
  .object({
    address: yup.string().required('Обязательное поле'),
  })
  .required()

type AddressSchemaType = yup.InferType<typeof addressSchema>

export const BuyScreen = () => {
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
          vibration.success()
          console.log('🚀 - address:', address)
        },
        (error: any) => {
          vibration.error()
          console.log('😭 - error:', error)
        },
      ),
    [],
  )

  const onPressAddCard = useCallback(() => {
    navigate('loyaltyCardAdd')
  }, [])

  return (
    <FormProvider {...form}>
      <Buy onSubmit={onSubmit} onPressAddCard={onPressAddCard} />
    </FormProvider>
  )
}
