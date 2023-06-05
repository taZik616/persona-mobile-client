import React, {useMemo, useRef} from 'react'

import {yupResolver} from '@hookform/resolvers/yup'
import {FormProvider, useForm} from 'react-hook-form'
import * as yup from 'yup'

import {FastBuy, FastBuyRefType} from 'src/components/FastBuy'
import {vibration} from 'src/services/vibration'

const fastBuySchema = yup
  .object({
    telephone: yup.string().trim().required('Обязательное поле').trim(),
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

  const onSubmit = useMemo(
    () =>
      form.handleSubmit(
        async ({name, telephone}: FastBuySchemaType) => {
          vibration.success()
          console.log('🚀 - name:', name)
          console.log('🚀 - telephone:', telephone)
          // if request error
          // fastBuyRef.current?.setError('Error')
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
      <FastBuy ref={fastBuyRef} onSubmit={onSubmit} />
    </FormProvider>
  )
}
