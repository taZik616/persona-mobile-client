import React from 'react'

import {Help} from 'src/components/Help'
import {useTypedNavigation} from 'src/hooks'
import {helpfulInfoKey} from 'src/types'

export const HelpScreen = () => {
  const {navigate} = useTypedNavigation()

  const onPressDetail = (key: helpfulInfoKey, title: string) => {
    navigate('helpDetail', {
      title,
      queryPath: key,
    })
  }

  return <Help onPressDetail={onPressDetail} />
}
