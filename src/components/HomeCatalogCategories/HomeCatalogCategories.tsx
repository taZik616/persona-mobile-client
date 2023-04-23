import React from 'react'

import {FlatList, ScrollView} from 'react-native'

import {useGender} from 'src/hooks/useGender'
import {CategoryI} from 'src/types'

import {CategoryCardWHM} from './CategoryCard'

import {Header} from '../ui/Header'
import {SelectorTwoOptions} from '../ui/SelectorTwoOptions'
import {Spacer} from '../ui/Spacer'

interface HomeCatalogCategoriesProps {
  onPressCategory?: (categoryId: string) => void
  catMen: CategoryI[]
  catWomen: CategoryI[]
  onPressGiftCard?: () => void
}

export const HomeCatalogCategories = ({
  onPressCategory,
  onPressGiftCard,
  catMen,
  catWomen,
}: HomeCatalogCategoriesProps) => {
  const {isMenSelected, onChangeGender, values} = useGender()
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
          renderItem={({item: {title, image, categoryId}}) => (
            <CategoryCardWHM
              imgUri={image}
              title={title}
              onPress={onPressCategory}
              categoryId={categoryId}
            />
          )}
          ItemSeparatorComponent={() => <Spacer height={16} />}
          keyExtractor={a => a.categoryId}
          data={isMenSelected ? catMen : catWomen}
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
