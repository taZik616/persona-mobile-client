import React from 'react'

import {useTypedRouteCatalogStack} from 'src/hooks'
import {useCategoriesQuery} from 'src/store/shopApi/shopApi'

import {Header} from '../ui/Header'
import {SubcategoriesList} from '../ui/SubcategoriesList'

interface HomeCatalogSubcategoriesProps {
  onPressSubCategory?: (catId: number) => void
}

export const HomeCatalogSubcategories = ({
  onPressSubCategory,
}: HomeCatalogSubcategoriesProps) => {
  const {headerTitle, categoryId} =
    useTypedRouteCatalogStack<'subcategories'>().params

  const data = useCategoriesQuery({
    parentId: categoryId,
  })

  return (
    <>
      <Header hideSearch showBack title={headerTitle} />
      {data.currentData && (
        <SubcategoriesList
          onPressItem={onPressSubCategory}
          subcategories={data.currentData}
        />
      )}
    </>
  )
}
