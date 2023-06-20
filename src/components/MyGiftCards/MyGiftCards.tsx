import React, {useCallback} from 'react'

import {useFocusEffect} from '@react-navigation/native'
import {FlashList} from '@shopify/flash-list'

import {withHorizontalMargins} from 'src/hoc/withHorizontalMargins'
import {useTypedRoute} from 'src/hooks'
import {
  useMyGiftedCardsQuery,
  useUpdateMyGiftCardStatusesMutation,
} from 'src/store/shopApi'
import {GiftCardInterface} from 'src/types'

import {GiftCard} from 'ui/cards'
import {Header, Spacer} from 'ui/index'

const GiftCardWHM = withHorizontalMargins(GiftCard)

interface MyGiftCardsProps {
  onPressGiftCard?: (promocode: string) => void
}

export const MyGiftCards = ({onPressGiftCard}: MyGiftCardsProps) => {
  const data = useMyGiftedCardsQuery({})
  const {needUpdateStatuses} = useTypedRoute<'myGiftCards'>().params ?? {}
  const [updateStatuses, updateHelper] = useUpdateMyGiftCardStatusesMutation()
  const giftCards = data.currentData as GiftCardInterface[] | undefined

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
      <Header showBack hideBasket hideSearch title="Подарочные карты" />
      <FlashList
        data={giftCards ?? []}
        onRefresh={async () => {
          await updateStatuses({})
          data.refetch()
        }}
        refreshing={data.isLoading || updateHelper.isLoading}
        estimatedItemSize={250}
        keyExtractor={it => String(it.promocode)}
        ListHeaderComponent={<Spacer height={20} />}
        ListFooterComponent={<Spacer withBottomInsets height={20} />}
        ItemSeparatorComponent={() => <Spacer height={12} />}
        renderItem={({item}) => (
          <GiftCardWHM onPress={onPressGiftCard} {...item} />
        )}
      />
    </>
  )
}
