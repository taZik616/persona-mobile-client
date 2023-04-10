import React from 'react'

import {FlatList, ScrollView, StyleSheet} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {useGender} from 'src/hooks/useGender'
import {CategoryInterface} from 'src/types'

import {CardWithImage} from '../ui/CardWithImage'
import {CategoryCard} from '../ui/CategoryCard'
import {Header} from '../ui/Header'
import {SelectorTwoOptions} from '../ui/SelectorTwoOptions'
import {Spacer} from '../ui/Spacer'
import {Swiper} from '../ui/Swiper'
import {Text} from '../ui/Text'

interface HomeMainProps {
  menImgUri: string
  womenImgUri: string
  mainSliderImages: string[]
  newProductsInCategoriesWomen: CategoryInterface[]
  newProductsInCategoriesMen: CategoryInterface[]
  newProductsInBrandsWomen: CategoryInterface[]
  newProductsInBrandsMen: CategoryInterface[]
}

export function HomeMain({
  menImgUri,
  womenImgUri,
  mainSliderImages,
  newProductsInCategoriesWomen,
  newProductsInCategoriesMen,
  newProductsInBrandsWomen,
  newProductsInBrandsMen,
}: HomeMainProps) {
  const {isMenSelected, onChangeGender, values} = useGender()

  return (
    <>
      <Header />
      <ScrollView>
        <Spacer height={8} />
        <SelectorTwoOptions onChange={onChangeGender} values={values} />
        <Spacer height={16} />
        <Swiper images={mainSliderImages} />
        <Spacer height={16} />
        <CardWithImage
          style={styles.marginHorizontal}
          uri={isMenSelected ? menImgUri : womenImgUri}
        />
        <Spacer height={36} />
        <Text center cg2>
          НОВЫЕ ПОСТУПЛЕНИЯ
        </Text>
        <Spacer height={12} />
        <RenderList
          onPressItem={item => console.log('Item pressed: ', item)}
          data={
            isMenSelected
              ? newProductsInCategoriesMen
              : newProductsInCategoriesWomen
          }
        />
        <Spacer height={28} />
        <Text center cg2>
          {'новое в брендах'.toUpperCase()}
        </Text>
        <Spacer height={12} />
        <RenderList
          onPressItem={item => console.log('Item pressed: ', item)}
          data={
            isMenSelected ? newProductsInBrandsMen : newProductsInBrandsWomen
          }
        />
        <Spacer height={28} />
        <Text center cg2>
          {'подарочные карты'.toUpperCase()}
        </Text>
        <Spacer height={12} />
        <CardWithImage
          style={styles.marginHorizontal}
          borderRadius={32}
          uri={
            'https://vadim-backet.s3.eu-central-1.amazonaws.com/PersonaCard.png'
          }
        />
        <Spacer height={48} />
      </ScrollView>
    </>
  )
}

interface RenderListProps {
  data: CategoryInterface[]
  onPressItem?: (item: CategoryInterface) => void
}

function RenderList({data, onPressItem}: RenderListProps) {
  const {left, right} = useSafeAreaInsets()
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.categoryContainer,
        {paddingLeft: left + 24, paddingRight: right + 24},
      ]}
      renderItem={({item}) => (
        <CategoryCard onPress={() => onPressItem?.(item)} {...item} />
      )}
      keyExtractor={i => i.id}
      data={data}
    />
  )
}

const styles = StyleSheet.create({
  categoryContainer: {
    gap: 16,
  },
  marginHorizontal: {
    paddingHorizontal: 24,
  },
})
