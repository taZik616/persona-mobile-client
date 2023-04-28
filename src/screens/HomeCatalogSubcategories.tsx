import React from 'react'

import {HomeCatalogSubcategories} from 'src/components/HomeCatalogSubcategories'
import {useTypedNavigation, useTypedRouteCatalogStack} from 'src/hooks'
import {CategoryI} from 'src/types'

export const HomeCatalogSubcategoriesScreen = () => {
  const {navigate} = useTypedNavigation()
  const {categoryId} = useTypedRouteCatalogStack<'subcategories'>().params

  const onPressSubCategory = ({categoryId: subcatId}: CategoryI) => {
    navigate('home', {
      screen: 'homeCatalog',
      params: {
        screen: 'products',
        params: {
          categoryId,
          subcategoryId: subcatId,
        },
      },
    })
  }
  return <HomeCatalogSubcategories onPressSubCategory={onPressSubCategory} />
}
