import React from 'react'

import {HomeCatalogSubcategories} from 'src/components/HomeCatalogSubcategories'
import {useTypedNavigation, useTypedRouteCatalogStack} from 'src/hooks'

export const HomeCatalogSubcategoriesScreen = () => {
  const {navigate} = useTypedNavigation()
  const {categoryId} = useTypedRouteCatalogStack<'subcategories'>().params

  const onPressSubCategory = (subcategoryId: number) => {
    navigate('home', {
      screen: 'homeCatalog',
      params: {
        screen: 'products',
        params: {
          categoryId,
          subcategoryId,
        },
      },
    })
  }
  return <HomeCatalogSubcategories onPressSubCategory={onPressSubCategory} />
}
