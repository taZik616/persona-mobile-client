import React from 'react'

import {ScrollView, StyleSheet} from 'react-native'

import {useGender} from 'src/hooks/useGender'
import {CategoryInterface} from 'src/types'

import {CardWithImage} from '../ui/CardWithImage'
import {Header} from '../ui/Header'
import {RenderHorizontalList} from '../ui/RenderHorizontalList'
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
  onPressAnyListItem?: (item: CategoryInterface) => void
}

export const HomeMain = ({
  menImgUri,
  womenImgUri,
  mainSliderImages,
  newProductsInCategoriesWomen,
  newProductsInCategoriesMen,
  newProductsInBrandsWomen,
  newProductsInBrandsMen,
  onPressAnyListItem,
}: HomeMainProps) => {
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
        <RenderHorizontalList
          onPressItem={onPressAnyListItem}
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
        <RenderHorizontalList
          onPressItem={onPressAnyListItem}
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

const styles = StyleSheet.create({
  marginHorizontal: {
    paddingHorizontal: 24,
  },
})
