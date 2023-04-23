import React from 'react'

import {HelpDetail} from 'src/components/HelpDetail'
import {useTypedRoute} from 'src/hooks'
import {useGetHelpDetailsQuery} from 'src/store/shopApi'

export const HelpDetailScreen = () => {
  const {title, queryPath} = useTypedRoute<'helpDetail'>().params ?? {}

  const {isLoading, isError, refetch, currentData} =
    useGetHelpDetailsQuery(queryPath)

  return (
    <HelpDetail
      title={title}
      isError={isError}
      onPressRetry={refetch}
      content={currentData?.content}
      isLoading={isLoading}
    />
  )
}
