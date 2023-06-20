import React, {useCallback, useMemo} from 'react'

import {FlashList} from '@shopify/flash-list'
import {ScrollView} from 'react-native'

import {useTypedNavigation} from 'src/hooks'
import {useGender} from 'src/hooks/useGender'
import {useMainContentQuery} from 'src/store/shopApi'
import {
  AnyContentPartItem,
  HomeMainContentI,
  HomeMainContentItem,
} from 'src/types'
import {CARD_BORDER_RADIUS} from 'src/variables'

import {CardWithImageWHM} from 'ui/cards/CardWithImage'
import {Header, SelectorTwoOptions, Spacer, Swiper} from 'ui/index'

import {LoadingSkeleton} from './LoadingSkeleton'
import {RenderContent} from './RenderContent'

interface HomeMainProps {
  onPressContentItem?: (
    contentPart: HomeMainContentItem,
    item: AnyContentPartItem,
  ) => void
  onPressGiftCard?: () => void
}

export const HomeMain = ({
  onPressContentItem,
  onPressGiftCard,
}: HomeMainProps) => {
  const {navigate} = useTypedNavigation()
  const {isMenSelected, onChangeGender, values} = useGender()
  const page = useMainContentQuery(isMenSelected ? 'men' : 'women')

  const curData = page.currentData as HomeMainContentI | undefined

  const swiperImages = useMemo(() => {
    return curData?.mainSwiperImages.map(a => a.imageUrl)
  }, [curData])

  const onPressSwiperImage = useCallback(
    (index: number) => {
      const {productFilters} = curData?.mainSwiperImages[index] || {}
      const showFilter = !productFilters?.brandIds
      const showCategoriesFilter = !(
        productFilters?.categoryId || productFilters?.subcategoryId
      )
      const hideGenderSelect = !!(
        productFilters?.categoryId ||
        productFilters?.subcategoryId ||
        productFilters?.gender
      )

      navigate('allProducts', {
        ...productFilters,
        showFilter,
        showCategoriesFilter,
        hideGenderSelect,
      })
    },
    [curData],
  )

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
        {page.isLoading || !curData ? (
          <LoadingSkeleton />
        ) : (
          <>
            {swiperImages ? (
              <Swiper onPress={onPressSwiperImage} images={swiperImages} />
            ) : (
              <></>
            )}
            {curData.bannerCard ? (
              <>
                <Spacer height={16} />
                <CardWithImageWHM autoWidth uri={curData.bannerCard} />
              </>
            ) : (
              <></>
            )}
            <FlashList
              scrollEnabled={false}
              estimatedItemSize={300}
              renderItem={({item}) => (
                <RenderContent onPressItem={onPressContentItem} {...item} />
              )}
              data={curData.otherContent}
            />
            <Spacer height={28} />
            <CardWithImageWHM
              autoWidth
              onPress={onPressGiftCard}
              borderRadius={CARD_BORDER_RADIUS}
              uri={
                'http://89.108.71.146:2006/media/another-images/PersonaCard.jpg'
              }
            />
          </>
        )}
        <Spacer withBottomInsets height={40} />
      </ScrollView>
    </>
  )
}
