import React, {useMemo} from 'react'

import {HomeMainContentItem, MainContentItemType} from 'src/types'

import {RenderFashionList} from '../ui/RenderFashionList'
import {RenderHorizontalList} from '../ui/RenderHorizontalList'
import {Spacer} from '../ui/Spacer'
import {Swiper} from '../ui/Swiper'
import {Text} from '../ui/Text'

type RenderContentProps = {
  onPressItem?: (item: HomeMainContentItem, id: string) => void
} & HomeMainContentItem

export const RenderContent = ({onPressItem, ...item}: RenderContentProps) => {
  const {title, type, items} = item

  const renderContent = useMemo(() => {
    switch (type) {
      case MainContentItemType.BrandsList:
        return (
          <RenderHorizontalList
            onPressItem={id => onPressItem?.(item, id)}
            data={items}
          />
        )
      case MainContentItemType.BrandsSwiper:
        return (
          <Swiper
            onPress={id => onPressItem?.(item, items[id].id)}
            images={items.map(a => a.imgUri)}
          />
        )
      case MainContentItemType.CategoriesList:
        return (
          <RenderHorizontalList
            onPressItem={id => onPressItem?.(item, id)}
            data={items}
          />
        )
      case MainContentItemType.FashionList:
        return (
          <RenderFashionList
            onPressItem={id => onPressItem?.(item, id)}
            data={items}
          />
        )
      case MainContentItemType.FashionSwiper:
        return (
          <Swiper
            hasVibration
            onPress={id => onPressItem?.(item, items[id].id)}
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
