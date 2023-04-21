import React from 'react'

import {FlashList} from '@shopify/flash-list'
import {ScrollView} from 'react-native'

import {useGender} from 'src/hooks/useGender'
import {HomeMainContentI, HomeMainContentItem} from 'src/types'

import {RenderContent} from './RenderContent'

import {CardWithImageWHM} from '../ui/CardWithImage'
import {Header} from '../ui/Header'
import {SelectorTwoOptions} from '../ui/SelectorTwoOptions'
import {Spacer} from '../ui/Spacer'
import {Swiper} from '../ui/Swiper'

interface HomeMainProps {
  menData: HomeMainContentI
  womenData: HomeMainContentI
  onPressContentItem?: (item: HomeMainContentItem, id: string) => void
}

export const HomeMain = ({
  menData,
  womenData,
  onPressContentItem,
}: HomeMainProps) => {
  const {isMenSelected, onChangeGender, values} = useGender()
  const curData = isMenSelected ? menData : womenData

  const {bannerCard, mainSwiperImages, otherContent} = curData || {}

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
        <Swiper images={mainSwiperImages} />
        {bannerCard ? (
          <>
            <Spacer height={16} />
            <CardWithImageWHM autoWidth uri={bannerCard} />
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
          data={otherContent}
        />
        <Spacer height={28} />
        <CardWithImageWHM
          autoWidth
          borderRadius={32}
          uri={
            'https://vadim-backet.s3.eu-central-1.amazonaws.com/PersonaCard.png'
          }
        />
        <Spacer withBottomInsets height={40} />
      </ScrollView>
    </>
  )
}
