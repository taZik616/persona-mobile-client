import React, {useCallback, useRef} from 'react'

import {HomeMain} from 'src/components/HomeMain'
import {
  FashionItemsPresent,
  FashionItemsPresentRefType,
} from 'src/components/ui/FashionItemsPresent'
import {useTypedNavigation} from 'src/hooks'
import {
  HomeMainContentItem,
  MainContentItemType,
  ProductPreviewInfo,
} from 'src/types'

export const HomeMainScreen = () => {
  const fashionPresentRef = useRef<FashionItemsPresentRefType>(null)
  const {navigate} = useTypedNavigation()

  const onPressContentItem = useCallback(
    (item: HomeMainContentItem, id: string) => {
      switch (item.type) {
        case MainContentItemType.BrandsList:
        case MainContentItemType.BrandsSwiper:
          const brandId = item.items.find(a => a.id === id)?.brandId
          if (brandId) {
            navigate('allProducts', {
              brandIds: [brandId],
              showGenderSelect: false,
            })
          }
          break
        case MainContentItemType.CategoriesList:
          const categoryId = item.items.find(a => a.id === id)?.categoryId
          if (categoryId) {
            navigate('allProducts', {
              categoryId,
              showGenderSelect: false,
            })
          }
          break
        case MainContentItemType.FashionList:
        case MainContentItemType.FashionSwiper:
          const productIds = item.items.find(a => a.id === id)?.productIds
          if (productIds) {
            fashionPresentRef.current?.setProductIds(productIds)
            fashionPresentRef.current?.open?.()
          }
          break
      }
    },
    [],
  )
  const onPressProduct = useCallback((item: ProductPreviewInfo) => {
    navigate('productDetail', {item, productId: item.productId})
  }, [])

  const onPressGiftCard = () => {
    navigate('giftCard')
  }

  return (
    <>
      <HomeMain
        onPressGiftCard={onPressGiftCard}
        onPressContentItem={onPressContentItem}
      />
      <FashionItemsPresent
        onPressProduct={onPressProduct}
        ref={fashionPresentRef}
      />
    </>
  )
}
