import React from 'react'

import {StyleSheet, useWindowDimensions} from 'react-native'

import {Color} from 'src/themes'

import {BasketEmptyIcon} from '../ui/icons/common'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'

interface BasketListEmptyProps {
  isAvailable: boolean
}

export const BasketListEmpty = ({isAvailable}: BasketListEmptyProps) => {
  const {height} = useWindowDimensions()
  return (
    <SafeLandscapeView style={styles.container}>
      <Spacer height={(height - 100) / 7.5} />
      <BasketEmptyIcon />
      <Spacer height={16} />
      <Text gp3 center color={Color.primaryGray} maxWidth={230}>
        {isAvailable
          ? 'Ваша корзина с товарами в наличии пуста'
          : 'Ваша корзина с недоступными товарами пуста'}
      </Text>
    </SafeLandscapeView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
