import React from 'react'

import {HomeProfile} from 'src/components/HomeProfile'
import {useTypedNavigation} from 'src/hooks'

export const HomeProfileScreen = () => {
  const {navigate} = useTypedNavigation()

  const onPressAddCard = () => navigate('loyaltyCardAdd')
  const onPressHelp = () => navigate('help')
  const onPressPersonal = () => navigate('personal')
  const onPressRecoverPassword = () => navigate('recoveryPasswordEnterPhone')
  const onPressOrders = () => navigate('orders')

  return (
    <HomeProfile
      onPressPersonal={onPressPersonal}
      onPressHelp={onPressHelp}
      onPressOrders={onPressOrders}
      onPressAddCard={onPressAddCard}
      onPressRecoverPassword={onPressRecoverPassword}
    />
  )
}
