import React, {useCallback} from 'react'

import {HomeCatalogCategories} from 'src/components/HomeCatalogCategories'
import {useTypedNavigation} from 'src/hooks'
import {CategoryI} from 'src/types'

export const HomeCatalogCategoriesScreen = () => {
  const {navigate} = useTypedNavigation()

  const onPressCategory = useCallback((categoryId: string) => {
    navigate('home', {
      screen: 'homeCatalog',
      params: {
        screen: 'subcategories',
        params: {
          categoryId,
          headerTitle:
            allData.find(a => a.categoryId === categoryId)?.fullTitle ?? '',
        },
      },
    })
  }, [])

  return (
    <HomeCatalogCategories
      catWomen={fakeCategoriesWomen}
      catMen={fakeCategoriesMen}
      onPressCategory={onPressCategory}
    />
  )
}
// Если это читает бекендер, то ты скатина из за которой я пишу эти фейк-дата константы
const fakeCategoriesWomen: CategoryI[] = [
  {
    image:
      'https://vadim-backet.s3.eu-central-1.amazonaws.com/catalog_1_women.jpg',
    title: 'ОДЕЖДА',
    fullTitle: 'Женская одежда',
    categoryId: '1',
  },
  {
    image:
      'https://vadim-backet.s3.eu-central-1.amazonaws.com/catalog_2_women.jpg',
    title: 'ОБУВЬ',
    fullTitle: 'Женская обувь',
    categoryId: '2',
  },
  {
    image:
      'https://vadim-backet.s3.eu-central-1.amazonaws.com/catalog_3_women.jpg',
    title: 'СУМКИ',
    fullTitle: 'Женские сумки',
    categoryId: '3',
  },
  {
    image:
      'https://vadim-backet.s3.eu-central-1.amazonaws.com/catalog_4_women.jpg',
    title: 'АКСЕССУАРЫ',
    fullTitle: 'Женские аксессуары',
    categoryId: '4',
  },
]

const fakeCategoriesMen: CategoryI[] = [
  {
    image:
      'https://vadim-backet.s3.eu-central-1.amazonaws.com/catalog_1_men.jpg',
    title: 'ОДЕЖДА',
    fullTitle: 'Мужская одежда',
    categoryId: '5',
  },
  {
    image:
      'https://vadim-backet.s3.eu-central-1.amazonaws.com/catalog_2_men.jpg',
    title: 'ОБУВЬ',
    fullTitle: 'Мужская обувь',
    categoryId: '6',
  },
  {
    image:
      'https://vadim-backet.s3.eu-central-1.amazonaws.com/catalog_3_men.jpg',
    title: 'СУМКИ',
    fullTitle: 'Мужские сумки',
    categoryId: '7',
  },
  {
    image:
      'https://vadim-backet.s3.eu-central-1.amazonaws.com/catalog_4_men.jpg',
    title: 'АКСЕССУАРЫ',
    fullTitle: 'Мужские аксессуары',
    categoryId: '8',
  },
]

const allData = [...fakeCategoriesWomen, ...fakeCategoriesMen]
