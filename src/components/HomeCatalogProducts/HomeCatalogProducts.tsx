import React from 'react'

import {useTypedRouteCatalogStack} from 'src/hooks'
import {ProductPreviewInfo} from 'src/types'

import {Header} from '../ui/Header'
import {RenderProductList} from '../ui/RenderProductList'

interface HomeCatalogProductsProps {
  onPressProduct?: (categoryId: ProductPreviewInfo) => void
}

export const HomeCatalogProducts = ({
  onPressProduct,
}: HomeCatalogProductsProps) => {
  const {subcategoryId} = useTypedRouteCatalogStack<'products'>().params

  return (
    <>
      <Header showBack />
      <RenderProductList
        showCounter
        sortBy="Subdivision_ID"
        sortedValues={subcategoryId}
        onPressProduct={onPressProduct}
      />
    </>
  )
}
