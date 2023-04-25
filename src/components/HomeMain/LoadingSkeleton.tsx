import React from 'react'

import {ScrollView, StyleSheet} from 'react-native'

import {SCREEN_W} from 'src/variables'

import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {ListItemSkeleton} from '../ui/Skeletons/ListItem'
import {CardSkeleton} from '../ui/Skeletons/Swiper'
import {TitleSkeleton} from '../ui/Skeletons/Title'
import {Spacer} from '../ui/Spacer'
import {Swiper} from '../ui/Swiper'

export const LoadingSkeleton = () => {
  return (
    <>
      <TitleSkeleton center />
      <Spacer height={16} width={SCREEN_W / 2} />
      <ScrollView horizontal>
        <SafeLandscapeView style={styles.row} safeArea>
          <ListItemSkeleton />
          <ListItemSkeleton />
          <ListItemSkeleton />
          <ListItemSkeleton />
          <ListItemSkeleton />
        </SafeLandscapeView>
      </ScrollView>
      <Spacer height={16} />
      <TitleSkeleton center />
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
