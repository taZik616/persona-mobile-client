import React from 'react'

import {HomeProfile} from 'src/components/HomeProfile'
import {useTypedNavigation} from 'src/hooks'

export const HomeProfileScreen = () => {
  const {navigate} = useTypedNavigation()

  const onPressAddCard = () => {
    navigate('loyaltyCardAdd')
  }

  return <HomeProfile onPressAddCard={onPressAddCard} />
}
