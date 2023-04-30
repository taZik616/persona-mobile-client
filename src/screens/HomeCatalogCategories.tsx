import React, {useCallback} from 'react'

import {HomeCatalogCategories} from 'src/components/HomeCatalogCategories'
import {useTypedNavigation} from 'src/hooks'

export const HomeCatalogCategoriesScreen = () => {
  const {navigate} = useTypedNavigation()

  const onPressCategory = useCallback(
    (categoryId: string, fullTitle: string) => {
      navigate('home', {
        screen: 'homeCatalog',
        params: {
          screen: 'subcategories',
          params: {
            categoryId,
            headerTitle: fullTitle,
          },
        },
      })
    },
    [],
  )
  const onPressGiftCard = () => {
    navigate('giftCard')
  }

  return (
    <HomeCatalogCategories
      onPressGiftCard={onPressGiftCard}
      onPressCategory={onPressCategory}
    />
  )
}
