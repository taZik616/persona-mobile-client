import React from 'react'

import {HomeMain} from 'src/components/HomeMain'
import {useTypedNavigation} from 'src/hooks'

export function HomeMainScreen() {
  const {navigate} = useTypedNavigation()

  // const onPressCard = (item: TicketInfo) => {
  //   navigate('ticketDetail', {ticketId: item.id})
  // }
  return <HomeMain />
}
