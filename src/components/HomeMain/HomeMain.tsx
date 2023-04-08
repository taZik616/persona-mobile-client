import React from 'react'

import {FlatList, ScrollView, StyleSheet} from 'react-native'

import {CategoryInterface} from 'src/types'

import {CategoryCard} from '../ui/CategoryCard'
import {HomeHeader} from '../ui/HomeHeader'
import {SelectorTwoOptions} from '../ui/SelectorTwoOptions'
import {Spacer} from '../ui/Spacer'
import {Swiper} from '../ui/Swiper'
import {Text} from '../ui/Text'

interface HomeMainProps {}

export function HomeMain({}: HomeMainProps) {
  const categoryData1: CategoryInterface[] = [
    {
      uri: 'https://sc04.alicdn.com/kf/U582bf0a50ba8468cb2da7d2d6a0114aaz.png',
      name: 'Сумки',
      id: '1',
    },
    {
      uri: 'https://img.alicdn.com/imgextra/i1/1794440690/O1CN01MaePPt1Gy3tpwkGJ2_!!1794440690-2-lubanu-s.png',
      name: 'Платья',
      id: '2',
      logoUri: 'http://89.108.71.146:8000/CAT_logo/587/lo234234234go.jpg',
    },
    {
      uri: 'https://i.otzovik.com/objects/b/160000/158796.png',
      name: 'босоножки',
      id: '3',
      logoUri: 'http://89.108.71.146:8000/CAT_logo/540/aL324234tER.png',
    },
  ]
  return (
    <>
      <HomeHeader />
      <ScrollView>
        <Spacer height={8} />
        <SelectorTwoOptions
          marginHorizontal={24}
          values={['ЖЕНСКОЕ', 'МУЖСКОЕ']}
        />
        <Spacer height={16} />
        <Swiper
          images={[
            'https://s0.rbk.ru/v6_top_pics/media/img/6/11/756789425072116.jpg',
            'https://s0.rbk.ru/v6_top_pics/media/img/6/11/756789425072116.jpg',
            'https://s0.rbk.ru/v6_top_pics/media/img/6/11/756789425072116.jpg',
          ]}
        />
        <Spacer height={40} />
        <Text center cg2>
          НОВЫЕ ПОСТУПЛЕНИЯ
        </Text>
        <Spacer height={18} />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
          renderItem={({item}) => (
            <CategoryCard
              onPress={() => console.log('CategoryCard pressed')}
              {...item}
            />
          )}
          keyExtractor={i => i.id}
          data={categoryData1}
        />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
  categoryContainer: {
    gap: 16,
    paddingHorizontal: 24,
  },
  marginHorizontal: {
    paddingHorizontal: 24,
  },
})
