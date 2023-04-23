import React from 'react'

import {FlatList} from 'react-native'

import {useTypedRouteCatalogStack} from 'src/hooks'
import {CategoriesListItem} from 'src/types'

import {Header} from '../ui/Header'
import {RenderHorizontalList} from '../ui/RenderHorizontalList'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'

interface HomeCatalogSubcategoriesProps {
  subcategories: {
    title: string
    items: CategoriesListItem[]
  }[]
  onPressSubCategory?: (id: string) => void
}

export const HomeCatalogSubcategories = ({
  subcategories,
  onPressSubCategory,
}: HomeCatalogSubcategoriesProps) => {
  const {headerTitle} = useTypedRouteCatalogStack<'subcategories'>().params
  return (
    <>
      <Header hideSearch showBack title={headerTitle} />
      <FlatList
        nestedScrollEnabled
        renderItem={({item: rootItem}) => (
          <>
            <Spacer height={16} />
            <Text cg2 center>
              {rootItem.title.toUpperCase()}
            </Text>
            <Spacer height={12} />
            <RenderHorizontalList
              onPressItem={onPressSubCategory}
              data={rootItem.items}
            />
          </>
        )}
        keyExtractor={a => a.title}
        data={subcategories}
      />
    </>
  )
}
