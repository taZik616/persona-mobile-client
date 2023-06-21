import React, {memo} from 'react'

import {SafeLandscapeView, Spacer, Text} from 'ui/index'

interface BrandGroupTitleProps {
  title: string
}

export const BrandGroupTitle = memo(({title}: BrandGroupTitleProps) => {
  return (
    <SafeLandscapeView safeArea>
      <Spacer height={20} />
      <Text gp2>{title}</Text>
      <Spacer height={10} />
    </SafeLandscapeView>
  )
})
