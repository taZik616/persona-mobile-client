import React from 'react'

import {HomeProfile} from 'src/components/HomeProfile'
import {useTypedNavigation} from 'src/hooks'

export const HomeProfileScreen = () => {
  const {navigate} = useTypedNavigation()

  const onPressAddCard = () => navigate('loyaltyCardAdd')
  const onPressHelp = () => navigate('help')
  const onPressPersonal = () => navigate('personal')

  return (
    <HomeProfile
      onPressPersonal={onPressPersonal}
      onPressHelp={onPressHelp}
      onPressAddCard={onPressAddCard}
    />
  )
}
