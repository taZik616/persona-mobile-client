import React from 'react'

import {HomeCatalogSubcategories} from 'src/components/HomeCatalogSubcategories'
import {useTypedNavigation, useTypedRouteCatalogStack} from 'src/hooks'
import {CategoriesListItem} from 'src/types'

export const HomeCatalogSubcategoriesScreen = () => {
  const {navigate} = useTypedNavigation()
  const {categoryId} = useTypedRouteCatalogStack<'subcategories'>().params
  const curSubCats = fakeSubcategories.find(a => a.id === categoryId)

  const onPressSubCategory = (id: string) => {
    navigate('home', {
      screen: 'homeCatalog',
      params: {
        screen: 'products',
        params: {
          categoryId,
          subcategoryId: id,
        },
      },
    })
  }
  return (
    <HomeCatalogSubcategories
      onPressSubCategory={onPressSubCategory}
      subcategories={(curSubCats ?? fakeSubcategories[0]).subcategories}
    />
  )
}

const fakeSubcategories: {
  id: string
  subcategories: {
    title: string
    items: CategoriesListItem[]
  }[]
}[] = [
  {
    id: '1',
    subcategories: [
      {
        title: 'Платья',
        items: [
          {
            id: '1', // Same with categoryId
            categoryId: '1',
            name: 'Вечерние',
            imgUri:
              'https://vadim-backet.s3.eu-central-1.amazonaws.com/dress_1.png',
          },
          {
            id: '2', // Same with categoryId
            categoryId: '2',
            name: 'Сарафаны',
            imgUri:
              'https://vadim-backet.s3.eu-central-1.amazonaws.com/dress_2.png',
          },
          {
            id: '3', // Same with categoryId
            categoryId: '3',
            name: 'Повседневные',
            imgUri:
              'https://vadim-backet.s3.eu-central-1.amazonaws.com/dress_3.png',
          },
        ],
      },
      {
        title: 'Куртки',
        items: [
          {
            id: '1',
            categoryId: '1',
            name: 'Джинсовые',
            imgUri:
              'https://vadim-backet.s3.eu-central-1.amazonaws.com/jacket_1.png',
          },
          {
            id: '2',
            categoryId: '2',
            name: 'Пуховые',
            imgUri:
              'https://vadim-backet.s3.eu-central-1.amazonaws.com/jacket_2.png',
          },
          {
            id: '3',
            categoryId: '3',
            name: 'Кожаные',
            imgUri:
              'https://vadim-backet.s3.eu-central-1.amazonaws.com/jacket_3.png',
          },
        ],
      },
    ],
  },
]
