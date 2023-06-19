import React, {memo} from 'react'

import {Image, Pressable, StyleSheet, View} from 'react-native'

import {cleanNumber} from 'src/helpers'
import {Color} from 'src/themes'
import {GiftCardInterface} from 'src/types'

import {Spacer, Text} from 'ui/index'

interface GiftCardProps extends GiftCardInterface {
  onPress?: (promocode: string) => void
}
export const GiftCard = memo(({onPress, ...item}: GiftCardProps) => {
  const {balance, cardType, promocode, isActive} = item

  return (
    <Pressable onPress={() => onPress?.(promocode)} style={styles.container}>
      <Text gp5>Промокод:</Text>
      <Spacer height={4} />
      <Text color={Color.primary} lineHeight={22} selectable gp5>
        {promocode}
      </Text>
      <Spacer height={10} />
      <Text gp5>Досупно для покупок:</Text>
      <Spacer height={4} />
      <Text color={Color.primary} lineHeight={22} gp5>
        {cleanNumber(balance, ' ', 0)} ₽
      </Text>
      <Spacer height={20} />
      <View style={styles.statusContainer}>
        <Text gp5>Статус:</Text>
        {isActive ? (
          <Text color={Color.primary} gp5>
            Активна
          </Text>
        ) : (
          <Text color={Color.textRed1} gp5>
            Требуется оплата
          </Text>
        )}
      </View>
    </Pressable>
  )
})

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.border,
  },
  statusContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productCard: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
  },
  productImg: {
    height: 100,
    width: 80,
  },
})
