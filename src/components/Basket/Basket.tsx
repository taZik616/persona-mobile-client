import React, {useState} from 'react'

import {FlashList} from '@shopify/flash-list'

import {selectBasket, useTypedSelector} from 'src/store'
import {ProductPreviewInfo} from 'src/types'

import {BasketCardWHM} from '../ui/BasketCard'
import {Button} from '../ui/Button'
import {Header} from '../ui/Header'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {ViewTogglerWHM} from '../ui/ViewToggler'

interface BasketProps {
  onPressBack?: () => void
  onPressBasketItem?: (item: ProductPreviewInfo) => void
  onChangeSelect?: (item: ProductPreviewInfo, isSelected: boolean) => void
}

export const Basket = ({
  onPressBasketItem,
  onChangeSelect,
  onPressBack,
}: BasketProps) => {
  const [filter, setFilter] = useState(options[0].value)
  const items = useTypedSelector(selectBasket)

  const isAvailable = options[0].value === filter

  const curData = items?.filter(it => it.isAvailable === isAvailable)
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
        data={curData}
        estimatedItemSize={230}
        keyExtractor={it => it.productId + filter}
        ListHeaderComponent={() => (
          <>
            <Spacer height={20} />
            <ViewTogglerWHM
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
            <Spacer withBottomInsets height={20} />
          </SafeLandscapeView>
        )}
        ItemSeparatorComponent={() => <Spacer height={12} />}
        renderItem={({item}) => (
          <BasketCardWHM
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
