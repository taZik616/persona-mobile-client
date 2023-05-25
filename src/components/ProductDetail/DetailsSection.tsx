import React, {memo, useMemo, useState} from 'react'

import {useTypedRoute} from 'src/hooks'
import {useGetProductByIdQuery} from 'src/store/shopApi/shopApi'

import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'
import {ViewToggler} from '../ui/ViewToggler'

export const DetailsSection = memo(() => {
  const {productId} = useTypedRoute<'productDetail'>().params ?? {}
  const details = useGetProductByIdQuery(productId)
  const [tab, setTab] = useState(options[0].value)
  const {description} = (details.currentData as any) || {}

  const content = useMemo(() => {
    switch (tab) {
      case 'desc':
        return description ? <Text gp4>{description}</Text> : <></>
      default:
        return <></>
    }
  }, [tab])

  return (
    <SafeLandscapeView safeArea>
      <ViewToggler onEndToggle={setTab} options={options} />
      <Spacer height={16} />
      {content}
    </SafeLandscapeView>
  )
})

const options = [
  {
    title: 'Описание',
    value: 'desc',
  },
  {
    title: 'Информация',
    value: 'info',
  },
  {
    title: 'Доставка',
    value: 'delivery',
  },
  {
    title: 'Возврат',
    value: 'return',
  },
]
