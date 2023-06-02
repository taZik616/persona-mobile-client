import React, {memo} from 'react'

import {FlatList, Pressable, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import {s} from 'react-native-size-matters'
import {Spacer, Text} from 'ui/index'

import {vibration} from 'src/services/vibration'
import {CategoryType} from 'src/types'

import {SafeLandscapeView} from './SafeLandscapeView'
import {SubcategoriesListSkeleton} from './Skeletons/SubcategoriesList'

interface SubcategoriesListProps {
  subcategories: CategoryType[]
  onPressItem?: (catId: number) => void
}

export const SubcategoriesList = memo(
  ({subcategories, onPressItem}: SubcategoriesListProps) => {
    const renderItem = ({item}: {item: CategoryType}) => {
      const handlePress = () => {
        vibration.light()
        onPressItem?.(item.categoryId)
      }

      return (
        <Pressable style={styles.item} onPress={handlePress}>
          <FastImage
            style={styles.image}
            resizeMode="contain"
            source={{uri: item.image, priority: FastImage.priority.high}}
          />
          <Spacer height={8} />
          <Text center cg4 numberOfLines={2}>
            {item.name.toUpperCase()}
          </Text>
        </Pressable>
      )
    }

    return (
      <SafeLandscapeView style={styles.flexOne} safeArea>
        <FlatList
          keyExtractor={item => String(item.categoryId)}
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
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingBottom: 30,
    paddingTop: 20,
  },
  item: {
    width: s(140),
  },
  flexOne: {flex: 1},
  image: {
    height: s(140),
    width: '100%',
  },
})
