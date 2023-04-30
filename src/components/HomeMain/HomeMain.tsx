import React from 'react'

import {FlashList} from '@shopify/flash-list'
import {ScrollView} from 'react-native'

import {useGender} from 'src/hooks/useGender'
import {useGetMainContentQuery} from 'src/store/shopApi'
import {HomeMainContentI, HomeMainContentItem} from 'src/types'
import {CARD_BORDER_RADIUS} from 'src/variables'

import {LoadingSkeleton} from './LoadingSkeleton'
import {RenderContent} from './RenderContent'

import {CardWithImageWHM} from '../ui/CardWithImage'
import {Header} from '../ui/Header'
import {SelectorTwoOptions} from '../ui/SelectorTwoOptions'
import {Spacer} from '../ui/Spacer'
import {Swiper} from '../ui/Swiper'

interface HomeMainProps {
  onPressContentItem?: (item: HomeMainContentItem, id: string) => void
  onPressGiftCard?: () => void
}

export const HomeMain = ({
  onPressContentItem,
  onPressGiftCard,
}: HomeMainProps) => {
  const {isMenSelected, onChangeGender, values} = useGender()
  const page = useGetMainContentQuery(isMenSelected ? 'men' : 'women')

  const curData = page.currentData as HomeMainContentI | undefined

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
            <Swiper images={curData.mainSwiperImages} />
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
                'https://vadim-backet.s3.eu-central-1.amazonaws.com/PersonaCard.png'
              }
            />
          </>
        )}
        <Spacer withBottomInsets height={40} />
      </ScrollView>
    </>
  )
}
