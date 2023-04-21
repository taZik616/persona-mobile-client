import React, {useCallback} from 'react'

import {HomeMain} from 'src/components/HomeMain'
import {HomeMainContentItem, MainContentItemType} from 'src/types'
import {MAIN_SLIDER_MEN, MAIN_SLIDER_WOMEN} from 'src/variables/fakeData'

export const HomeMainScreen = () => {
  // const {navigate} = useTypedNavigation()

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
          console.log('FashionList:', item, id)
          break
        case MainContentItemType.FashionSwiper:
          console.log('FashionSwiper:', item, id)
          break
      }
    },
    [],
  )

  return (
    <HomeMain
      menData={MAIN_SLIDER_MEN}
      womenData={MAIN_SLIDER_WOMEN}
      onPressContentItem={onPressContentItem}
    />
  )
}
