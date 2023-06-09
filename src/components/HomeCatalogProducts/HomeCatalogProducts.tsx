import React from 'react'

import {useTypedRouteCatalogStack} from 'src/hooks'
import {ProductPreviewInfo} from 'src/types'

import {Header} from 'ui/index'
import {ProductList} from 'ui/product-list'

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
      <ProductList
        showCounter
        showFilter
        showCategoriesFilter
        subcategoryId={subcategoryId}
        onPressProduct={onPressProduct}
      />
    </>
  )
}
