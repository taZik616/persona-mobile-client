import React from 'react'

import {Subscriptions} from 'src/components/Subscriptions'
import {useTypedDispatch} from 'src/store'
import {setSubEmail, setSubPush, setSubSms} from 'src/store/profileSlice'

export const SubscriptionsScreen = () => {
  const dispatch = useTypedDispatch()

  const onChangeEmailSub = (isEnabled: boolean) => {
    dispatch(setSubEmail(isEnabled))
  }
  const onChangeSmsSub = (isEnabled: boolean) => {
    dispatch(setSubSms(isEnabled))
  }
  const onChangePushSub = (isEnabled: boolean) => {
    dispatch(setSubPush(isEnabled))
  }

  return (
    <Subscriptions
      onChangeEmailSub={onChangeEmailSub}
      onChangeSmsSub={onChangeSmsSub}
      onChangePushSub={onChangePushSub}
    />
  )
}
