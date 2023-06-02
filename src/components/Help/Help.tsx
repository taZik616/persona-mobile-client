import React from 'react'

import {ScrollView, StyleSheet} from 'react-native'
import {
  ContactsIcon,
  DeliveryIcon,
  ExchangeIcon,
  PaymentIcon,
  PrivacyPolicyIcon,
  SellConditionIcon,
} from 'ui/icons/common'
import {Header, MenuButton, SafeLandscapeView, Spacer} from 'ui/index'

import {helpfulInfoKey} from 'src/types'

interface HelpProps {
  onPressDetail?: (key: helpfulInfoKey, title: string) => void
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
