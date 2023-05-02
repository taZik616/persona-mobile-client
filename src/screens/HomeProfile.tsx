import React from 'react'

import {HomeProfile} from 'src/components/HomeProfile'
import {useTypedNavigation} from 'src/hooks'
import {useTypedDispatch} from 'src/store'
import {whenExitHandler} from 'src/store/profileSlice'
import {ProductPreviewInfo} from 'src/types'

export const HomeProfileScreen = () => {
  const {navigate} = useTypedNavigation()
  const dispatch = useTypedDispatch()

  const onPressAddCard = () => navigate('loyaltyCardAdd')
  const onPressHelp = () => navigate('help')
  const onPressPersonal = () => navigate('personal')
  const onPressRecoverPassword = () => navigate('recoveryPasswordEnterPhone')
  const onPressOrders = () => navigate('orders')
  const onPressSubscription = () => navigate('subscriptions')
  const onPressRecentlyItem = (item: ProductPreviewInfo) =>
    navigate('productDetail', {item, productId: item.productId})
  const onPressExit = () => {
    console.log('exit')
    dispatch(whenExitHandler)
  }

  return (
    <HomeProfile
      onPressExit={onPressExit}
      onPressRecentlyItem={onPressRecentlyItem}
      onPressPersonal={onPressPersonal}
      onPressHelp={onPressHelp}
      onPressSubscription={onPressSubscription}
      onPressOrders={onPressOrders}
      onPressAddCard={onPressAddCard}
      onPressRecoverPassword={onPressRecoverPassword}
    />
  )
}
