import React from 'react'

import {APP_API_URL} from '@env'
import {FlatList, ScrollView} from 'react-native'

import {useGender} from 'src/hooks/useGender'
import {useCategoriesQuery} from 'src/store/shopApi'

import {Header, SelectorTwoOptions, Spacer} from 'ui/index'

import {CategoryCardWHM} from './CategoryCard'

interface HomeCatalogCategoriesProps {
  onPressCategory?: (categoryId: number, fullTitle: string) => void
  onPressGiftCard?: () => void
}

export const HomeCatalogCategories = ({
  onPressCategory,
  onPressGiftCard,
}: HomeCatalogCategoriesProps) => {
  const {isMenSelected, onChangeGender, values} = useGender()
  const {currentData} = useCategoriesQuery({
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
              onPress={id => item.name && onPressCategory?.(id, item.name)}
            />
          )}
          ItemSeparatorComponent={() => <Spacer height={16} />}
          keyExtractor={a => a.categoryId}
          data={
            currentData ? currentData : emptyArr // скелетон нет нужды делать, так можно)
          }
        />
        <Spacer height={16} />
        <CategoryCardWHM
          image={`${APP_API_URL}/media/another-images/catalog_card.jpg`}
          name="ПОДАРОЧНАЯ КАРТА"
          onPress={onPressGiftCard}
          // @ts-ignore
          categoryId="gift card"
        />
        <Spacer height={28} />
      </ScrollView>
    </>
  )
}

const emptyEl = () => ({
  name: '',
  image: '',
  categoryId: Math.random(),
})
const emptyArr = [emptyEl(), emptyEl(), emptyEl(), emptyEl()]
