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
import {MAIN_SLIDER_MEN, MAIN_SLIDER_WOMEN} from 'src/variables/fakeData'

export const HomeMainScreen = () => {
  const fashionPresentRef = useRef<FashionItemsPresentRefType>(null)
  const {navigate} = useTypedNavigation()

  const onPressContentItem = useCallback(
    (item: HomeMainContentItem, id: string) => {
      switch (item.type) {
        case MainContentItemType.BrandsList:
          console.log('BrandsList:', item, id)
          break
        case MainContentItemType.BrandsSwiper:
          console.log('BrandsSwiper:', item, id)
          break
        case MainContentItemType.CategoriesList:
          console.log('CategoriesList:', item, id)
          break
        case MainContentItemType.FashionList:
        case MainContentItemType.FashionSwiper:
          console.log('FashionList or FashionSwiper:', item, id)
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
    navigate('productDetail', item)
  }, [])

  return (
    <>
      <HomeMain
        menData={MAIN_SLIDER_MEN}
        womenData={MAIN_SLIDER_WOMEN}
        onPressContentItem={onPressContentItem}
      />
      <FashionItemsPresent
        onPressProduct={onPressProduct}
        ref={fashionPresentRef}
      />
    </>
  )
}
