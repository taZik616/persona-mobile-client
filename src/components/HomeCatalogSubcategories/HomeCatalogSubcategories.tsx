import React from 'react'

import {useTypedRouteCatalogStack} from 'src/hooks'
import {useGetCategoriesQuery} from 'src/store/shopApi'
import {CategoryI} from 'src/types'

import {Header} from '../ui/Header'
import {SubcategoriesList} from '../ui/SubcategoriesList'

interface HomeCatalogSubcategoriesProps {
  onPressSubCategory?: (item: CategoryI) => void
}

export const HomeCatalogSubcategories = ({
  onPressSubCategory,
}: HomeCatalogSubcategoriesProps) => {
  const {headerTitle, categoryId} =
    useTypedRouteCatalogStack<'subcategories'>().params

  const data = useGetCategoriesQuery({category: categoryId})

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
