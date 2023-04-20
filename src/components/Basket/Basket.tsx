import React, {useState} from 'react'

import {FlashList} from '@shopify/flash-list'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {withHorizontalMargins} from 'src/hoc/withHorizontalMargins'
import {selectBasket, useTypedSelector} from 'src/store'
import {ProductPreviewInfo} from 'src/types'

import {BasketCard} from '../ui/BasketCard'
import {Button} from '../ui/Button'
import {Header} from '../ui/Header'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {ViewToggler} from '../ui/ViewToggler'

interface BasketProps {
  onPressBack?: () => void
  onPressBasketItem?: (basketItemId: string, item: ProductPreviewInfo) => void
  onPressAddFavorites?: (basketItemId: string) => void
  onPressRemove?: (basketItemId: string) => void
}

const BasketCardWHM = withHorizontalMargins(BasketCard)

export const Basket = ({
  onPressBasketItem,
  onPressAddFavorites,
  onPressRemove,
  onPressBack,
}: BasketProps) => {
  const {bottom} = useSafeAreaInsets()
  const [filter, setFilter] = useState(options[0].value)
  const {items} = useTypedSelector(selectBasket)

  const onChangeSelect = (id: string, isSelected: boolean) => {
    console.log('🚀 - onChangeSelect:', id, '-', isSelected)
  }
  const isAvailable = options[0].value === filter
  return (
    <>
      <Header
        title="Корзина"
        onPressBack={onPressBack}
        showBack
        hideSearch
        hideBasket
      />
      <FlashList
        data={items?.filter(it => it.isAvailable === isAvailable)}
        estimatedItemSize={230}
        keyExtractor={it => it.id}
        ListHeaderComponent={() => (
          <>
            <Spacer height={20} />
            <ViewToggler
              initialValue={filter}
              onEndToggle={setFilter}
              options={options}
            />
            <Spacer height={16} />
          </>
        )}
        ListFooterComponent={() => (
          <SafeLandscapeView safeArea>
            <Spacer height={16} />
            <Button gp5 variant="outline">
              Добавить промокод
            </Button>
            <Spacer height={16} />
            <Button gp5>Купить</Button>
            <Spacer height={bottom + 20} />
          </SafeLandscapeView>
        )}
        ItemSeparatorComponent={() => <Spacer height={12} />}
        renderItem={({item}) => (
          <BasketCardWHM
            onAddFavorites={onPressAddFavorites}
            onRemove={onPressRemove}
            onPress={onPressBasketItem}
            onChangeSelect={onChangeSelect}
            {...item}
          />
        )}
      />
    </>
  )
}

const options = [
  {
    value: 'available',
    title: 'В наличии',
  },
  {
    value: 'notAvailable',
    title: 'Нет в наличии',
  },
]
