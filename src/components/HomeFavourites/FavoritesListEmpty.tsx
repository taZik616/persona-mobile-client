import React from 'react'

import {StyleSheet, useWindowDimensions} from 'react-native'

import {Color} from 'src/themes'

import {FavoritesEmptyIcon} from 'ui/icons/common'
import {SafeLandscapeView, Spacer, Text} from 'ui/index'

interface FavoritesListEmptyProps {
  isAvailable: boolean
}

export const FavoritesListEmpty = ({isAvailable}: FavoritesListEmptyProps) => {
  const {height} = useWindowDimensions()
  return (
    <SafeLandscapeView style={styles.container}>
      <Spacer height={(height - 100) / 7.5} />
      <FavoritesEmptyIcon />
      <Spacer height={16} />
      <Text gp3 center color={Color.primaryGray} maxWidth={230}>
        {isAvailable
          ? 'У вас нету доступных товаров в избранном'
          : 'У вас нету недоступных товаров в избранном'}
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
