import React, {memo} from 'react'

import {StyleSheet, View} from 'react-native'

import {selectProfile, useTypedSelector} from 'src/store'
import {Color} from 'src/themes'

import {Text} from './Text'

interface FirstBuyInAppBannerProps {
  spaceTop?: number
  spaceBottom?: number
}

export const FirstBuyInAppBanner = memo(
  ({spaceTop, spaceBottom}: FirstBuyInAppBannerProps) => {
    const hasFirstBuy = useTypedSelector(selectProfile).hasFirstBuyInApp

    if (hasFirstBuy) return null
    return (
      <View
        style={[
          styles.container,
          {marginBottom: spaceBottom, marginTop: spaceTop},
        ]}>
        <Text>
          <Text gp4>-20% на первый заказ через приложение по промокоду: </Text>
          <Text color={Color.primary} selectable gp4>
            YOUR20
          </Text>
        </Text>
      </View>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    borderColor: Color.primaryBlack,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
  },
})
