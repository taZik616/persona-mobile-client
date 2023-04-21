import {HomeMainContentI, MainContentItemType} from 'src/types'

export const MAIN_SLIDER_MEN: HomeMainContentI = {
  mainSwiperImages: [
    'https://s0.rbk.ru/v6_top_pics/media/img/6/11/756789425072116.jpg',
    'https://vadim-backet.s3.eu-central-1.amazonaws.com/DiscountBaner.jpg',
    'https://s0.rbk.ru/v6_top_pics/media/img/6/11/756789425072116.jpg',
  ],
  bannerCard:
    'https://vadim-backet.s3.eu-central-1.amazonaws.com/MenAutumn.jpg',
  otherContent: [
    {
      type: MainContentItemType.CategoriesList,
      title: 'Новые поступления',
      items: [
        {
          id: '1',
          categoryId: '229',
          imgUri: 'https://www.werfstore.ru/wp-content/uploads/2021/06/3.png',
          name: 'Сумки',
        },
        {
          id: '2',
          categoryId: '182',
          imgUri:
            'https://img.alicdn.com/imgextra/i1/2178635711/O1CN015rM4hh1s3gXVyqEqC_!!0-item_pic.jpg',
          name: 'Рубашки',
        },
        {
          id: '3',
          categoryId: '268',
          imgUri:
            'https://krasivieremni.ru/wa-data/public/shop/products/83/73/27383/images/3042/3042.970.png',
          name: 'Ремни',
        },
      ],
    },
    {
      type: MainContentItemType.BrandsList,
      title: 'Новое в брендах',
      items: [
        {
          id: '1',
          brandId: '540',
          imgUri:
            'https://soho.com.ru/upload/iblock/c76/m24f8g20j7gescp3plbkut38fvgffoa1.png',
          logoUri:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Stone-Island-Logo.svg/2560px-Stone-Island-Logo.svg.png',
        },
      ],
    },
    {
      type: MainContentItemType.BrandsSwiper,
      title: 'Новые поступления (var. 2)',
      items: [
        {
          id: '1',
          brandId: '4',
          imgUri:
            'https://vadim-backet.s3.eu-central-1.amazonaws.com/BrandSwiper2.png',
        },
        {
          id: '2',
          brandId: '5',
          imgUri:
            'https://s0.rbk.ru/v6_top_pics/media/img/6/11/756789425072116.jpg',
        },
      ],
    },
    {
      type: MainContentItemType.FashionSwiper,
      title: 'ОСЕНЬ В ГОРОДЕ',
      items: [
        {
          id: '1',
          productIds: ['38594', '38881'],
          imgUri:
            'https://vadim-backet.s3.eu-central-1.amazonaws.com/menFashion.png',
        },
      ],
    },
    {
      type: MainContentItemType.FashionList,
      title: 'НОВЫЕ ОБРАЗЫ',
      items: [
        {
          id: '1',
          productIds: ['38623', '38699'],
          imgUri:
            'https://vadim-backet.s3.eu-central-1.amazonaws.com/MenFashionListItem1.png',
        },
        {
          id: '2',
          productIds: ['38717', '38621'],
          imgUri:
            'https://vadim-backet.s3.eu-central-1.amazonaws.com/MenFashionListItem2.png',
        },
      ],
    },
  ],
}

export const MAIN_SLIDER_WOMEN: HomeMainContentI = {
  mainSwiperImages: [
    'https://s0.rbk.ru/v6_top_pics/media/img/6/11/756789425072116.jpg',
    'https://vadim-backet.s3.eu-central-1.amazonaws.com/DiscountBaner.jpg',
    'https://s0.rbk.ru/v6_top_pics/media/img/6/11/756789425072116.jpg',
  ],
  bannerCard:
    'https://vadim-backet.s3.eu-central-1.amazonaws.com/WomenSummerCollection.jpg',
  otherContent: [
    {
      type: MainContentItemType.CategoriesList,
      title: 'Новые поступления',
      items: [
        {
          id: '1',
          categoryId: '44',
          imgUri:
            'https://sc04.alicdn.com/kf/U582bf0a50ba8468cb2da7d2d6a0114aaz.png',
          name: 'Сумки',
        },
        {
          id: '2',
          categoryId: '23',
          imgUri:
            'https://img.alicdn.com/imgextra/i1/1794440690/O1CN01MaePPt1Gy3tpwkGJ2_!!1794440690-2-lubanu-s.png',
          name: 'Платья',
        },
        {
          id: '3',
          categoryId: '445',
          imgUri:
            'https://i.pinimg.com/originals/1b/49/23/1b4923a54e778fcea0368d1db33319fb.png',
          name: 'босоножки',
        },
      ],
    },
    {
      type: MainContentItemType.BrandsList,
      title: 'Новое в брендах',
      items: [
        {
          id: '1',
          brandId: '33',
          imgUri:
            'https://alamode.ru/image/cache/catalog/Tovari/JAKETY/sn_247-950x950.png',
          logoUri: 'http://89.108.71.146:8000/CAT_logo/585/AGNONA.png',
        },
        {
          id: '2',
          brandId: '44',
          imgUri:
            'https://nikawatches.ru/upload/iblock/c6d/c6d4e99236dece8523a353c59c76b506.png',
          logoUri: 'http://89.108.71.146:8000/CAT_logo/587/lo234234234go.jpg',
        },
        {
          id: '3',
          brandId: '55',
          imgUri:
            'https://static.tildacdn.com/tild6138-3330-4364-b631-393730333636/923.png',
          logoUri: 'http://89.108.71.146:8000/CAT_logo/540/aL324234tER.png',
        },
      ],
    },
  ],
}
