import React from 'react'

import {HelpDetail} from 'src/components/HelpDetail'
import {useTypedNavigation, useTypedRoute} from 'src/hooks'
import {useGetHelpDetailsQuery} from 'src/store/shopApi'

export const HelpDetailScreen = () => {
  const {goBack} = useTypedNavigation()

  const {title, queryPath} = useTypedRoute<'helpDetail'>().params ?? {}

  const {isLoading, isError, refetch, currentData} =
    useGetHelpDetailsQuery(queryPath)

  return (
    <HelpDetail
      title={title}
      isError={isError}
      onPressRetry={refetch}
      onPressBack={goBack}
      content={currentData?.content}
      isLoading={isLoading}
    />
  )
}
