import React from 'react'

import {Personal} from 'src/components/Personal'
import {useTypedNavigation} from 'src/hooks'

export const PersonalScreen = () => {
  const {goBack, navigate} = useTypedNavigation()

  const onPressChangeInfo = () => {
    navigate('personalEdit')
  }

  return <Personal onPressBack={goBack} onPressChangeInfo={onPressChangeInfo} />
}
