import React from 'react'

import {Header, SubcategoriesList} from 'ui/index'

import {useTypedRouteCatalogStack} from 'src/hooks'
import {useCategoriesQuery} from 'src/store/shopApi/shopApi'

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
