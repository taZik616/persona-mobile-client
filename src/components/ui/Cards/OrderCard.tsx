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

import {ProgressIcon, RejectedIcon, SuccessIcon} from 'ui/icons/common'
import {Spacer, Text} from 'ui/index'

interface OrderCardProps extends OrderInfoInterface {
  onPressProductItem?: (productId: string) => void
  onPress?: (orderId: number) => void
}
export const OrderCard = memo(
  ({onPressProductItem, onPress, ...item}: OrderCardProps) => {
    const {orderId, totalSum, status, productsInfo} = item

    const statusObj = statusMap[status]
    if (!statusObj) return <></>

    return (
      <Pressable style={styles.container} onPress={() => onPress?.(orderId)}>
        <Text gp3>
          Заказ {orderId} на сумму {cleanNumber(totalSum, ' ', 0)} руб
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
          data={productsInfo}
          estimatedItemSize={100}
          ItemSeparatorComponent={() => <Spacer height={8} />}
          keyExtractor={(it, index) => String(index)}
          renderItem={({item: {images, productName, brand, productId}}) => {
            return (
              <TouchableOpacity
                onPress={() => onPressProductItem?.(productId)}
                style={styles.productCard}>
                <Image
                  source={{uri: images[0].compressedImage}}
                  resizeMode="contain"
                  style={styles.productImg}
                />
                <Spacer width={10} />
                <View style={styles.productContent}>
                  <Text gp2>{productName}</Text>
                  <Spacer height={5} />
                  {brand && <Text gp4>{brand.name}</Text>}
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
  AlreadyPaid: {
    icon: <SuccessIcon />,
    title: 'Оплачен',
    color: Color.primary,
  },
  Received: {
    icon: <SuccessIcon />,
    title: 'Получен',
    color: Color.primary,
  },
  Delivery: {
    icon: <ProgressIcon />,
    title: 'Доставляется',
    color: Color.primaryGray,
  },
  Mistaken: {
    icon: <RejectedIcon />,
    title: 'Отклонен',
    color: Color.textRed1,
  },
  PaymentUponDelivery: {
    icon: <ProgressIcon />,
    title: 'Оплата при получении, заказ обрабатывается',
    color: Color.primary,
  },
  NotPaid: {
    icon: <RejectedIcon />,
    title: 'Не оплачен',
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
