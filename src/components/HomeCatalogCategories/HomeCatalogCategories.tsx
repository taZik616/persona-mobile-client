import React from 'react'

import {FlatList, ScrollView} from 'react-native'

import {useGender} from 'src/hooks/useGender'
import {useGetCategoriesQuery} from 'src/store/shopApi'
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
  const data = useGetCategoriesQuery(isMenSelected ? 'men' : 'women')

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
          renderItem={({item: {title, image, fullTitle, categoryId}}) => (
            <CategoryCardWHM
              imgUri={image}
              title={title}
              onPress={
                categoryId ? id => onPressCategory?.(id, fullTitle) : undefined
              }
              categoryId={categoryId}
            />
          )}
          ItemSeparatorComponent={() => <Spacer height={16} />}
          keyExtractor={a => a.categoryId}
          data={
            data.currentData
              ? data.currentData
              : [emptyEl, emptyEl, emptyEl, emptyEl] // скелетон нет нужды делать, так можно)
          }
        />
        <Spacer height={16} />
        <CategoryCardWHM
          imgUri="https://vadim-backet.s3.eu-central-1.amazonaws.com/catalog_card.jpg"
          title="ПОДАРОЧНАЯ КАРТА"
          onPress={onPressGiftCard}
          categoryId="gift card"
        />
        <Spacer height={28} />
      </ScrollView>
    </>
  )
}

const emptyEl: CategoryI = {
  title: '',
  image: '',
  fullTitle: '',
  categoryId: '',
}
