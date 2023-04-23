import React from 'react'

import {ScrollView, StyleSheet} from 'react-native'

import {helpDetailKey} from 'src/types'

import {Header} from '../ui/Header'
import {
  ContactsIcon,
  DeliveryIcon,
  ExchangeIcon,
  PaymentIcon,
  PrivacyPolicyIcon,
  SellConditionIcon,
} from '../ui/icons/common'
import {MenuButton} from '../ui/MenuButton'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'

interface HelpProps {
  onPressDetail?: (key: helpDetailKey, title: string) => void
}

export const Help = ({onPressDetail}: HelpProps) => {
  return (
    <>
      <Header title="Помощь" showBack hideBasket hideSearch />
      <ScrollView>
        <Spacer height={24} />
        <SafeLandscapeView safeArea style={styles.container}>
          <MenuButton
            onPress={() => onPressDetail?.('payment_policy', 'Оплата')}
            leftIcon={<PaymentIcon />}
            title="Оплата"
          />
          <MenuButton
            onPress={() => onPressDetail?.('delivery', 'Доставка')}
            leftIcon={<DeliveryIcon />}
            title="Доставка"
          />
          <MenuButton
            onPress={() =>
              onPressDetail?.('exchange_and_return', 'Обмен и возврат')
            }
            leftIcon={<ExchangeIcon />}
            title="Обмен и возврат"
          />
          <MenuButton
            onPress={() => onPressDetail?.('terms_of_sale', 'Условия продажи')}
            leftIcon={<SellConditionIcon />}
            title="Условия продажи"
          />
          <MenuButton
            onPress={() =>
              onPressDetail?.('privacy_policy', 'Политика конфиденциальности')
            }
            leftIcon={<PrivacyPolicyIcon />}
            title="Политика конфиденциальности"
          />
          <MenuButton
            onPress={() => onPressDetail?.('contacts', 'Контакты')}
            leftIcon={<ContactsIcon />}
            title="Контакты"
          />
        </SafeLandscapeView>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    rowGap: 16,
  },
})
