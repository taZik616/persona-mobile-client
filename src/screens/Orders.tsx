import React from 'react'

import {Orders} from 'src/components/Orders'
import {OrderInfoInterface} from 'src/types'

export const OrdersScreen = () => {
  const onPressProductItem = (productId: string) => {
    console.log('onPressProductItem:', productId)
  }
  const onPressOrder = (orderId: string) => {
    console.log('onPressOrder:', orderId)
  }

  return (
    <Orders
      onPressOrder={onPressOrder}
      orders={fakeData}
      onPressProductItem={onPressProductItem}
    />
  )
}

const fakeData: OrderInfoInterface[] = [
  {
    totalPrice: 149878,
    id: '184',
    status: 'completed',
    items: [
      {
        title: 'RICK OWENS',
        category: 'Платье',
        productId: '30',
        image:
          'https://st.tsum.com/btrx/i/12/57/31/13/01_1526.jpg?u=1644791942',
      },
    ],
  },
  {
    totalPrice: 149878,
    id: '185',
    status: 'progress',
    items: [
      {
        title: 'STONE ISLAND',
        category: 'Я бы мог вставить другую картинку, но не охото',
        productId: '30',
        image:
          'https://st.tsum.com/btrx/i/12/57/31/13/01_1526.jpg?u=1644791942',
      },
      {
        title: 'Gucci тапки',
        category: 'Обувь',
        productId: '34',
        image:
          'https://st.tsum.com/btrx/i/12/57/31/13/01_1526.jpg?u=1644791942',
      },
    ],
  },
  {
    totalPrice: 149878,
    id: '186',
    status: 'rejected',
    items: [
      {
        title: 'RICK OWENS',
        category: 'Платье',
        productId: '30',
        image:
          'https://st.tsum.com/btrx/i/12/57/31/13/01_1526.jpg?u=1644791942',
      },
      {
        title: 'RICK OWENS',
        category: 'Платье',
        productId: '30',
        image:
          'https://st.tsum.com/btrx/i/12/57/31/13/01_1526.jpg?u=1644791942',
      },
      {
        title: 'RICK OWENS',
        category: 'Платье',
        productId: '30',
        image:
          'https://st.tsum.com/btrx/i/12/57/31/13/01_1526.jpg?u=1644791942',
      },
    ],
  },
  {
    totalPrice: 149878,
    id: '187',
    status: 'completed',
    items: [
      {
        title: 'RICK OWENS',
        category: 'Платье',
        productId: '30',
        image:
          'https://st.tsum.com/btrx/i/12/57/31/13/01_1526.jpg?u=1644791942',
      },
    ],
  },
  {
    totalPrice: 149878,
    id: '188',
    status: 'completed',
    items: [
      {
        title: 'RICK OWENS',
        category: 'Платье',
        productId: '30',
        image:
          'https://st.tsum.com/btrx/i/12/57/31/13/01_1526.jpg?u=1644791942',
      },
    ],
  },
]
