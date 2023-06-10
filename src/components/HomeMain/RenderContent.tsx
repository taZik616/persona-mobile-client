import React, {useMemo} from 'react'

import {HomeMainContentItem, MainContentItemType} from 'src/types'

import {
  HorizontalBrandsList,
  HorizontalCategoriesList,
} from 'ui/horizontal-lists'
import {FashionList} from 'ui/horizontal-lists'
import {Spacer, Swiper, Text} from 'ui/index'

type RenderContentProps = {
  onPressItem?: (contentPart: HomeMainContentItem, item: any) => void
} & HomeMainContentItem

export const RenderContent = ({
  onPressItem,
  ...contentPart
}: RenderContentProps) => {
  const {title, type, items} = contentPart

  const renderContent = useMemo(() => {
    switch (type) {
      case MainContentItemType.BrandsList:
        return (
          <HorizontalBrandsList
            onPressItem={(_, id) => onPressItem?.(contentPart, items[id])}
            brands={items}
          />
        )
      case MainContentItemType.BrandsSwiper:
        return (
          <Swiper
            onPress={id => onPressItem?.(contentPart, items[id])}
            images={items.map(a => a.imgUri)}
          />
        )
      case MainContentItemType.CategoriesList:
        return (
          <HorizontalCategoriesList
            onPressItem={(_, id) => onPressItem?.(contentPart, items[id])}
            categories={items}
          />
        )
      case MainContentItemType.FashionList:
        return (
          <FashionList
            onPressItem={id => onPressItem?.(contentPart, items[id])}
            data={items}
          />
        )
      case MainContentItemType.FashionSwiper:
        return (
          <Swiper
            hasVibration
            onPress={id => onPressItem?.(contentPart, items[id])}
            images={items.map(a => a.imgUri)}
          />
        )
    }
  }, [type, items, onPressItem])

  return (
    <>
      <Spacer height={28} />
      <Text center cg2>
        {title.toUpperCase()}
      </Text>
      <Spacer height={12} />
      {renderContent}
    </>
  )
}
