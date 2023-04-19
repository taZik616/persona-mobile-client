import React, {useMemo} from 'react'

import {yupResolver} from '@hookform/resolvers/yup'
import {FormProvider, useForm} from 'react-hook-form'
import * as yup from 'yup'

import {PersonalEdit} from 'src/components/PersonalEdit'
import {useTypedNavigation} from 'src/hooks'
import {vibration} from 'src/services/vibration'
import {selectProfile, useTypedDispatch, useTypedSelector} from 'src/store'
import {updateUserData} from 'src/store/profileSlice'

const personalEditSchema = yup
  .object({
    email: yup
      .string()
      .trim()
      .required('Обязательное поле')
      .email('Это поле должно содержать email адрес'),
    name: yup
      .string()
      .required('Обязательное поле')
      .min(2, 'Слишком короткое имя')
      .max(35, 'Имя слишком длинное')
      .trim(),
    surname: yup
      .string()
      .required('Обязательное поле')
      .min(2, 'Слишком короткая фамилия')
      .max(35, 'Фамилия слишком длинная')
      .trim(),
    dob: yup.date().max(new Date(), 'Дата должна быть в прошлом'),
  })
  .required()

type PersonalEditType = yup.InferType<typeof personalEditSchema>

export const PersonalEditScreen = () => {
  const {goBack} = useTypedNavigation()
  const dispatch = useTypedDispatch()

  const {email, dob, name, surname} = useTypedSelector(selectProfile)

  const form = useForm<PersonalEditType>({
    mode: 'onChange',
    resolver: yupResolver(personalEditSchema),
    defaultValues: {
      email,
      dob: dob ? new Date(dob) : undefined,
      name,
      surname,
    },
  })

  const onSubmit = useMemo(
    () =>
      form.handleSubmit(
        async ({dob: dateOfBirth, ...data}: PersonalEditType) => {
          await dispatch(
            updateUserData({...data, dob: dateOfBirth?.toString()}),
          )
          vibration.success()
          goBack()
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
      <PersonalEdit onPressBack={goBack} onSubmit={onSubmit} />
    </FormProvider>
  )
}
