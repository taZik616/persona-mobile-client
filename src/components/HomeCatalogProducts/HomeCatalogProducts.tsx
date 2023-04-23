import React from 'react'

import {Header} from '../ui/Header'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'

interface HomeCatalogProductsProps {
  //onPressCategory?: (categoryId: string) => void
}

export const HomeCatalogProducts = ({}: HomeCatalogProductsProps) => {
  return (
    <>
      <Header showBack />
      <SafeLandscapeView safeArea>
        <Spacer height={20} />
        <Text center gp4>
          Тут продукты должны быть но я не хочу снова фейк-дату использовать или
          запрос юзать который тут не должен быть
        </Text>
      </SafeLandscapeView>
    </>
  )
}
