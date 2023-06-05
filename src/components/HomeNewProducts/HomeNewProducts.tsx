import React from 'react'

import {useScreenBlockCurrent} from 'src/hooks'
import {ProductPreviewInfo} from 'src/types'

import {Header, SelectorTwoOptionsGender, Spacer} from 'ui/index'
import {ProductList} from 'ui/product-list'

interface HomeNewProductsProps {
  onPressProduct?: (item: ProductPreviewInfo) => void
}

export const HomeNewProducts = ({onPressProduct}: HomeNewProductsProps) => {
  useScreenBlockCurrent()

  return (
    <>
      <Header title="Новые поступления" />
      <SelectorTwoOptionsGender />
      <Spacer height={8} />
      <ProductList
        showFilter
        showCounter
        showCategoriesFilter
        isNew="True"
        onPressProduct={onPressProduct}
      />
    </>
  )
}
