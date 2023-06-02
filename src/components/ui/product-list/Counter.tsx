import React, {memo} from 'react'

import {Spacer} from 'ui/Spacer'
import {Text} from 'ui/Text'

import {getProductsCountString} from 'src/helpers'
import {Color} from 'src/themes'

export const Counter = memo(({count}: {count: number}) => (
  <>
    <Spacer height={10} />
    <Text center color={Color.primaryGray} gp4>
      {getProductsCountString(count)}
    </Text>
    <Spacer height={18} />
  </>
))
