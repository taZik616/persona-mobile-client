import React, {useCallback} from 'react'

import {HomeCatalogCategories} from 'src/components/HomeCatalogCategories'
import {showAlertGiftCardLocked} from 'src/helpers/showAlertGiftCardLocked'
import {useTypedNavigation} from 'src/hooks'
import {selectIsAuthenticated, useTypedSelector} from 'src/store'

export const HomeCatalogCategoriesScreen = () => {
  const {navigate} = useTypedNavigation()
  const isAuthenticated = useTypedSelector(selectIsAuthenticated)
  const onPressCategory = useCallback(
    (categoryId: number, fullTitle: string) => {
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
    isAuthenticated ? navigate('giftCard') : showAlertGiftCardLocked()
  }

  return (
    <HomeCatalogCategories
      onPressGiftCard={onPressGiftCard}
      onPressCategory={onPressCategory}
    />
  )
}
