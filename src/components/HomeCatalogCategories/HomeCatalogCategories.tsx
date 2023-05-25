import React from 'react'

import {APP_API_URL} from '@env'
import {nanoid} from '@reduxjs/toolkit'
import {FlatList, ScrollView} from 'react-native'

import {useGender} from 'src/hooks/useGender'
import {useCategoriesQuery} from 'src/store/shopApi/shopApi'
import {CategoryI} from 'src/types'

import {CategoryCardWHM} from './CategoryCard'

import {Header} from '../ui/Header'
import {SelectorTwoOptions} from '../ui/SelectorTwoOptions'
import {Spacer} from '../ui/Spacer'

interface HomeCatalogCategoriesProps {
  onPressCategory?: (categoryId: string, fullTitle: string) => void
  onPressGiftCard?: () => void
}

export const HomeCatalogCategories = ({
  onPressCategory,
  onPressGiftCard,
}: HomeCatalogCategoriesProps) => {
  const {isMenSelected, onChangeGender, values} = useGender()
  const data = useCategoriesQuery({
    gender: isMenSelected ? 'men' : 'women',
    level: 1,
  })

  return (
    <>
      <Header />
      <ScrollView>
        <Spacer height={8} />
        <SelectorTwoOptions
          isSecondActive={isMenSelected}
          onChange={onChangeGender}
          values={values}
        />
        <Spacer height={16} />
        <FlatList
          scrollEnabled={false}
          renderItem={({item}) => (
            <CategoryCardWHM
              {...item}
              onPress={id => onPressCategory?.(id, item.name)}
            />
          )}
          ItemSeparatorComponent={() => <Spacer height={16} />}
          keyExtractor={a => a.categoryId}
          data={
            data.currentData ? data.currentData : emptyArr // скелетон нет нужды делать, так можно)
          }
        />
        <Spacer height={16} />
        <CategoryCardWHM
          image={`${APP_API_URL}/media/another-images/catalog_card.jpg`}
          name="ПОДАРОЧНАЯ КАРТА"
          onPress={onPressGiftCard}
          categoryId="gift card"
        />
        <Spacer height={28} />
      </ScrollView>
    </>
  )
}

const emptyEl = (): CategoryI => ({
  name: '',
  image: '',
  categoryId: nanoid(),
})
const emptyArr = [emptyEl(), emptyEl(), emptyEl(), emptyEl()]
