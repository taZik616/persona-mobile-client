import React from 'react'

import {SafeLandscapeView} from './SafeLandscapeView'
import {Spacer} from './Spacer'
import {Text} from './Text'

interface BrandGroupTitleProps {
  title: string
}

export const BrandGroupTitle = ({title}: BrandGroupTitleProps) => {
  return (
    <SafeLandscapeView additionalPadding={24}>
      <Spacer height={20} />
      <Text gp2>{title}</Text>
      <Spacer height={10} />
    </SafeLandscapeView>
  )
}
