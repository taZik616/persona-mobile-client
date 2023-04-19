import React, {memo} from 'react'

import {FlashList} from '@shopify/flash-list'
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import {cleanNumber} from 'src/helpers'
import {Color} from 'src/themes'
import {OrderInfoInterface} from 'src/types'

import {ProgressIcon, RejectedIcon, SuccessIcon} from './icons/common'
import {Spacer} from './Spacer'
import {Text} from './Text'

interface OrderCardProps extends OrderInfoInterface {
  onPressProductItem?: (productId: string) => void
  onPress?: (orderId: string) => void
}
export const OrderCard = memo(
  ({onPressProductItem, onPress, ...item}: OrderCardProps) => {
    const {id, totalPrice, status, items} = item

    const statusObj = statusMap[status]

    return (
      <Pressable style={styles.container} onPress={() => onPress?.(id)}>
        <Text gp3>
          Заказ {id} на сумму {cleanNumber(totalPrice, ' ', 0)} руб
        </Text>
        <Spacer height={12} />
        <View style={styles.statusContainer}>
          {statusObj.icon}
          <Spacer width={8} />
          <Text color={statusObj.color} gp4>
            {statusObj.title}
          </Text>
        </View>
        <Spacer height={10} />
        <FlashList
          data={items}
          estimatedItemSize={100}
          ItemSeparatorComponent={() => <Spacer height={8} />}
          keyExtractor={(it, index) => String(index)}
          renderItem={({item: {image, title, category, productId}}) => {
            return (
              <TouchableOpacity
                onPress={() => onPressProductItem?.(productId)}
                style={styles.productCard}>
                <Image
                  source={{uri: image}}
                  resizeMode="contain"
                  style={styles.productImg}
                />
                <Spacer width={8} />
                <View style={styles.productContent}>
                  <Text gp2>{title}</Text>
                  <Spacer height={5} />
                  <Text gp4>{category}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </Pressable>
    )
  },
)

const statusMap = {
  rejected: {
    icon: <SuccessIcon />,
    title: 'Оплачен',
    color: Color.primary,
  },
  progress: {
    icon: <ProgressIcon />,
    title: 'Оформлен',
    color: Color.primaryGray,
  },
  completed: {
    icon: <RejectedIcon />,
    title: 'Отменен',
    color: Color.textRed1,
  },
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    minHeight: 192,
    borderWidth: 1,
    borderColor: Color.border,
  },
  statusContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
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
  productContent: {
    flex: 1,
  },
})
