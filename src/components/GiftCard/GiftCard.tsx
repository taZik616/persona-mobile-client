import React, {useState} from 'react'

import {ScrollView} from 'react-native'

import {useGiftCardTypesQuery} from 'src/store/shopApi'
import {Color} from 'src/themes'
import {GiftCardTypeI} from 'src/types'
import {CARD_BORDER_RADIUS} from 'src/variables'

import {
  Button,
  Header,
  Hint,
  SafeLandscapeView,
  Spacer,
  Swiper,
  Text,
} from 'ui/index'

interface GiftCardProps {
  onPressSelectNominal?: () => void
  onChangeCardType?: (id: number) => void
}

export const GiftCard = ({
  onPressSelectNominal,
  onChangeCardType,
}: GiftCardProps) => {
  const cardTypes = useGiftCardTypesQuery({})
  const [swiperIndex, setSwiperIndex] = useState(0)

  const onChangeImage = (id: number) => {
    setSwiperIndex(id)
    onChangeCardType?.(id)
  }

  const data = cardTypes.currentData as GiftCardTypeI[]

  return (
    <>
      <Header showBack hideSearch />
      <ScrollView>
        <Spacer height={20} />
        <Swiper
          onChangeImage={onChangeImage}
          borderRadius={CARD_BORDER_RADIUS}
          images={data?.map(a => a.image) ?? []}
        />
        <SafeLandscapeView safeArea>
          <Spacer height={18} />
          <Text cg2 center>
            ПОДАРОЧНАЯ КАРТА
          </Text>
          <Spacer height={4} />
          {data?.[swiperIndex] && (
            <Text gp1 color={Color.primaryGray} center>
              {data[swiperIndex].title}
            </Text>
          )}
          {/* <Spacer height={16} />
          <ViewToggler options={options} /> */}
          <Spacer height={16} />
          {data?.[swiperIndex] && (
            <Text lineHeight={20} gp4>
              {data[swiperIndex].description}
            </Text>
          )}
          <Hint
            id="giftcard-1"
            spaceTop={16}
            content="Подарочные карты работают как уникальный бессрочный промокод, который можно вручить кому угодно. Купленные подарочные карты и их остаток отображаются в разделе профиля"
          />
          <Spacer height={16} />
          <Button onPress={onPressSelectNominal} gp5>
            Выбрать номинал карты
          </Button>
          <Spacer withBottomInsets height={26} />
        </SafeLandscapeView>
      </ScrollView>
    </>
  )
}

// const options = [
//   {
//     value: 'virtual',
//     title: 'Вирутальная',
//   },
//   {
//     value: 'plastic',
//     title: 'Пластиковая',
//   },
// ]
