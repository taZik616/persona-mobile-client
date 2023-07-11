import React from 'react'

import {StyleSheet, View} from 'react-native'

import {cleanNumber} from 'src/helpers'

import {Spacer, Text} from 'ui/index'

interface CostLineProps {
  cost: string | number
  isFree?: boolean
  name: string
}

export const CostLine = ({cost, isFree, name}: CostLineProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText} numberOfLines={1} gp5>
        {name}
      </Text>
      <Spacer width={12} />
      <Text right style={styles.costText} numberOfLines={1} gp2>
        {isFree
          ? 'Бесплатно'
          : `${Number(cost) > 0 ? cleanNumber(Number(cost), ' ', 0) : 0} ₽`}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 8,
  },
  nameText: {
    flex: 2,
    flexWrap: 'wrap',
  },
  costText: {
    flex: 1,
    flexWrap: 'wrap',
  },
})
