import React, {memo} from 'react'

import {getProductsCountString} from 'src/helpers'
import {Color} from 'src/themes'

import {Spacer} from 'ui/Spacer'
import {Text} from 'ui/Text'

export const Counter = memo(({count}: {count: number}) => (
  <>
    <Spacer height={10} />
    <Text center color={Color.primaryGray} gp4>
      {getProductsCountString(count)}
    </Text>
    <Spacer height={18} />
  </>
))
