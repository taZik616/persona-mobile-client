import React, {useCallback, useRef} from 'react'

import {HomeMain} from 'src/components/HomeMain'
import {
  FashionItemsPresent,
  FashionItemsPresentRefType,
} from 'src/components/ui/FashionItemsPresent'
import {useTypedNavigation} from 'src/hooks'
import {
  AnyContentPartItem,
  HomeMainContentItem,
  MainContentItemType,
  ProductPreviewInfo,
} from 'src/types'

export const HomeMainScreen = () => {
  const fashionPresentRef = useRef<FashionItemsPresentRefType>(null)
  const {navigate} = useTypedNavigation()

  const onPressContentItem = useCallback(
    (contentPart: HomeMainContentItem, item: AnyContentPartItem) => {
      switch (contentPart.type) {
        case MainContentItemType.BrandsList:
        case MainContentItemType.BrandsSwiper:
          navigate('allProducts', item.queryFilters)
          break
        case MainContentItemType.CategoriesList:
          navigate('allProducts', item.queryFilters)
          break
        case MainContentItemType.FashionList:
        case MainContentItemType.FashionSwiper:
          const {productIds} = item
          if (productIds) {
            fashionPresentRef.current?.setProductIds(productIds)
            fashionPresentRef.current?.open?.()
          }
          break
      }
    },
    [],
  )
  const onPressProduct = useCallback((product: ProductPreviewInfo) => {
    navigate('productDetail', {product, productId: product.productId})
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
