import React, {useMemo} from 'react'

import {yupResolver} from '@hookform/resolvers/yup'
import {format} from 'date-fns'
import {FormProvider, useForm} from 'react-hook-form'
import * as yup from 'yup'

import {PersonalEdit} from 'src/components/PersonalEdit'
import {useTypedNavigation} from 'src/hooks'
import {vibration} from 'src/services/vibration'
import {selectProfile, useTypedDispatch, useTypedSelector} from 'src/store'
import {updateUserData} from 'src/store/profileSlice'

const personalEditSchema = yup
  .object({
    email: yup.string().trim().email('Это поле должно содержать email адрес'),
    firstName: yup
      .string()
      .required('Обязательное поле')
      .min(2, 'Слишком короткое имя')
      .max(35, 'Имя слишком длинное')
      .trim(),
    lastName: yup
      .string()
      .required('Обязательное поле')
      .min(2, 'Слишком короткая фамилия')
      .max(35, 'Фамилия слишком длинная')
      .trim(),
    birthday: yup
      .date()
      .max(new Date(), 'Дата должна быть в прошлом')
      .optional(),
  })
  .required()

type PersonalEditType = yup.InferType<typeof personalEditSchema>

export const PersonalEditScreen = () => {
  const {goBack} = useTypedNavigation()
  const dispatch = useTypedDispatch()

  const {email, firstName, lastName, birthday} = useTypedSelector(selectProfile)

  const isValidDob = !isNaN(Date.parse(birthday ?? ''))

  const form = useForm<PersonalEditType>({
    mode: 'onChange',
    resolver: yupResolver(personalEditSchema),
    defaultValues: {
      email,
      birthday: birthday && isValidDob ? new Date(birthday) : undefined,
      firstName,
      lastName,
    },
  })

  const onSubmit = useMemo(
    () =>
      form.handleSubmit(
        async ({birthday: dob, ...data}: PersonalEditType) => {
          let formattedDate: string | undefined
          if (dob) {
            formattedDate = format(dob, 'yyyy-MM-dd')
          }

          await dispatch(updateUserData({...data, birthday: formattedDate}))
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
      <PersonalEdit onSubmit={onSubmit} />
    </FormProvider>
  )
}
