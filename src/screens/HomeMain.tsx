import React from 'react'

import {HomeMain} from 'src/components/HomeMain'

export function HomeMainScreen() {
  // const {navigate} = useTypedNavigation()

  // const onPressCard = (item: TicketInfo) => {
  //   navigate('ticketDetail', {ticketId: item.id})
  // }
  return (
    <HomeMain
      mainSliderImages={[
        'https://s0.rbk.ru/v6_top_pics/media/img/6/11/756789425072116.jpg',
        'https://vadim-backet.s3.eu-central-1.amazonaws.com/DiscountBaner.jpg',
        'https://s0.rbk.ru/v6_top_pics/media/img/6/11/756789425072116.jpg',
      ]}
      newProductsInCategoriesWomen={[
        {
          uri: 'https://sc04.alicdn.com/kf/U582bf0a50ba8468cb2da7d2d6a0114aaz.png',
          name: 'Сумки',
          id: '1',
        },
        {
          uri: 'https://img.alicdn.com/imgextra/i1/1794440690/O1CN01MaePPt1Gy3tpwkGJ2_!!1794440690-2-lubanu-s.png',
          name: 'Платья',
          id: '2',
          // logoUri: 'http://89.108.71.146:8000/CAT_logo/587/lo234234234go.jpg',
        },
        {
          uri: 'https://i.pinimg.com/originals/1b/49/23/1b4923a54e778fcea0368d1db33319fb.png',
          name: 'босоножки',
          id: '3',
          // logoUri: 'http://89.108.71.146:8000/CAT_logo/540/aL324234tER.png',
        },
      ]}
      newProductsInBrandsWomen={[
        {
          uri: 'https://alamode.ru/image/cache/catalog/Tovari/JAKETY/sn_247-950x950.png',
          id: '1',
          logoUri: 'http://89.108.71.146:8000/CAT_logo/585/AGNONA.png',
        },
        {
          uri: 'https://nikawatches.ru/upload/iblock/c6d/c6d4e99236dece8523a353c59c76b506.png',
          id: '2',
          logoUri: 'http://89.108.71.146:8000/CAT_logo/587/lo234234234go.jpg',
        },
        {
          uri: 'https://static.tildacdn.com/tild6138-3330-4364-b631-393730333636/923.png',
          id: '3',
          logoUri: 'http://89.108.71.146:8000/CAT_logo/540/aL324234tER.png',
        },
      ]}
      menImgUri="https://vadim-backet.s3.eu-central-1.amazonaws.com/MenAutumn.jpg"
      womenImgUri="https://vadim-backet.s3.eu-central-1.amazonaws.com/WomenSummerCollection.jpg"
    />
  )
}
