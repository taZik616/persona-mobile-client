import React from 'react'

import {ScrollView, StyleSheet} from 'react-native'

import {SCREEN_W} from 'src/variables'

import {SafeLandscapeView, Spacer, Swiper} from 'ui/index'
import {BlockSkeleton} from 'ui/Skeletons/Block'
import {ListItemSkeleton} from 'ui/Skeletons/ListItem'
import {CardSkeleton} from 'ui/Skeletons/Swiper'

export const LoadingSkeleton = () => {
  return (
    <>
      <BlockSkeleton center />
      <Spacer height={16} width={SCREEN_W / 2} />
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        <SafeLandscapeView style={styles.row} safeArea>
          <ListItemSkeleton />
          <ListItemSkeleton />
          <ListItemSkeleton />
          <ListItemSkeleton />
          <ListItemSkeleton />
        </SafeLandscapeView>
      </ScrollView>
      <Spacer height={16} />
      <BlockSkeleton center />
      <Spacer height={16} />
      <Swiper images={['', '', '', '']} type="card-image-skeleton" />
      <Spacer height={16} />
      <CardSkeleton />
    </>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    columnGap: 16,
  },
})
