import React, {memo, useCallback} from 'react'

import {useFocusEffect} from '@react-navigation/native'
import {FlashList} from '@shopify/flash-list'

import {withHorizontalMargins} from 'src/hoc/withHorizontalMargins'
import {useTypedRoute} from 'src/hooks'
import {
  useMyOrdersQuery,
  useUpdateMyOrderStatusesMutation,
} from 'src/store/shopApi/shopApi'
import {OrderInfoInterface} from 'src/types'

import {OrderCard} from 'ui/cards'
import {Header, Spacer} from 'ui/index'

interface OrdersProps {
  onPressProductItem?: (productId: string) => void
  onPressOrder?: (orderId: number) => void
}

export const Orders = memo(
  ({onPressProductItem, onPressOrder}: OrdersProps) => {
    const data = useMyOrdersQuery({})
    const {needUpdateStatuses} = useTypedRoute<'orders'>().params ?? {}
    const [updateStatuses, updateHelper] = useUpdateMyOrderStatusesMutation()
    const orders = data.currentData as OrderInfoInterface[] | undefined

    useFocusEffect(
      useCallback(() => {
        const refreshList = async () => {
          if (needUpdateStatuses) {
            await updateStatuses({})
            data.refetch()
          }
        }
        refreshList()
      }, [needUpdateStatuses]),
    )

    return (
      <>
        <Header title="Ваши заказы" showBack hideSearch hideBasket />
        <FlashList
          data={orders ?? []}
          onRefresh={async () => {
            await updateStatuses({})
            data.refetch()
          }}
          refreshing={data.isLoading || updateHelper.isLoading}
          estimatedItemSize={250}
          keyExtractor={it => String(it.orderId)}
          ListHeaderComponent={<Spacer height={20} />}
          ListFooterComponent={<Spacer withBottomInsets height={20} />}
          ItemSeparatorComponent={() => <Spacer height={12} />}
          renderItem={({item}) => (
            <OrderCardWHM
              onPress={onPressOrder}
              onPressProductItem={onPressProductItem}
              {...item}
            />
          )}
        />
      </>
    )
  },
)

const OrderCardWHM = withHorizontalMargins(OrderCard)
