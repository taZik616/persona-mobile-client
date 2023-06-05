import React from 'react'

import {APP_API_URL} from '@env'
import {ScrollView} from 'react-native'

import {Color} from 'src/themes'
import {CARD_BORDER_RADIUS} from 'src/variables'

import {
  Button,
  Header,
  SafeLandscapeView,
  Spacer,
  Swiper,
  Text,
  ViewToggler,
} from 'ui/index'

interface GiftCardProps {
  onPressSelectNominal?: () => void
}

export const GiftCard = ({onPressSelectNominal}: GiftCardProps) => {
  return (
    <>
      <Header showBack hideSearch />
      <ScrollView>
        <Spacer height={20} />
        <Swiper
          borderRadius={CARD_BORDER_RADIUS}
          images={[
            `${APP_API_URL}/another_images/PersonaCard.jpg`,
            `${APP_API_URL}/another_images/PersonaCard.jpg`,
            `${APP_API_URL}/another_images/PersonaCard.jpg`,
          ]}
        />
        <SafeLandscapeView safeArea>
          <Spacer height={18} />
          <Text cg2 center>
            ПОДАРОЧНАЯ КАРТА
          </Text>
          <Spacer height={4} />
          <Text gp1 color={Color.primaryGray} center>
            Классическая
          </Text>
          <Spacer height={16} />
          <ViewToggler options={options} />
          <Spacer height={16} />
          <Text lineHeight={20} gp4>
            Виртуальная карта Persona принимается к оплате как в
            интернет-магазине, так и в Person’e. После внесения предоплаты на
            ваш номер телефона придет sms с PIN-кодом, а на почту - письмо с
            номером карты и штрих-кодом. Сразу после этого карту можно
            использовать. Подарочная карта действует на все бренды кроме: Apple,
            Chanel, S.T.Dupont, Dior, Fendi, Gucci, Prada, Miu Miu, Louis
            Vuitton, также действие карты не распространяется на ювелирные
            украшения и часы. Вы можете воспользоваться картой в течение года с
            момента активации.
          </Text>
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

const options = [
  {
    value: 'virtual',
    title: 'Вирутальная',
  },
  {
    value: 'plastic',
    title: 'Пластиковая',
  },
]
