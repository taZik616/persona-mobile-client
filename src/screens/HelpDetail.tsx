import React from 'react'

import {HelpDetail} from 'src/components/HelpDetail'
import {useTypedRoute} from 'src/hooks'
import {useHelpfulInfoQuery} from 'src/store/shopApi'

export const HelpDetailScreen = () => {
  const {title, queryPath} = useTypedRoute<'helpDetail'>().params ?? {}

  const {isLoading, isError, error, refetch, currentData} =
    useHelpfulInfoQuery(queryPath)

  const errorMessage = (error as any)?.data?.error
  return (
    <HelpDetail
      title={title}
      isError={isError}
      error={errorMessage}
      onPressRetry={refetch}
      content={currentData?.data}
      isLoading={isLoading}
    />
  )
}
