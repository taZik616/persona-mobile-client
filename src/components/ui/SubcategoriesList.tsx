import React, {memo} from 'react'

import {FlatList, Pressable, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import {s} from 'react-native-size-matters'

import {vibration} from 'src/services/vibration'
import {CategoryI} from 'src/types'

import {SafeLandscapeView} from './SafeLandscapeView'
import {SubcategoriesListSkeleton} from './Skeletons/SubcategoriesList'
import {Spacer} from './Spacer'
import {Text} from './Text'

interface SubcategoriesListProps {
  subcategories: CategoryI[]
  onPressItem?: (item: CategoryI) => void
}

export const SubcategoriesList = memo(
  ({subcategories, onPressItem}: SubcategoriesListProps) => {
    const renderItem = ({item}: {item: CategoryI}) => {
      const handlePress = () => {
        vibration.light()
        onPressItem?.(item)
      }

      return (
        <Pressable style={styles.item} onPress={handlePress}>
          <FastImage
            style={styles.image}
            resizeMode="contain"
            source={{uri: item.image}}
          />
          <Spacer height={8} />
          <Text center cg4 numberOfLines={2}>
            {item.title.toUpperCase()}
          </Text>
        </Pressable>
      )
    }

    return (
      <SafeLandscapeView style={styles.flexOne} safeArea>
        <FlatList
          keyExtractor={item => item.categoryId}
          renderItem={renderItem}
          ListEmptyComponent={<SubcategoriesListSkeleton />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
          data={subcategories}
        />
      </SafeLandscapeView>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    rowGap: 8,
    columnGap: 16,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingBottom: 30,
    paddingTop: 20,
  },
  item: {
    width: s(90),
  },
  flexOne: {flex: 1},
  image: {
    height: s(90),
    width: '100%',
  },
})
