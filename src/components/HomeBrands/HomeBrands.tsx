import React, {useMemo, useRef} from 'react'

import {FlatList, Pressable, SectionList, StyleSheet, View} from 'react-native'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import {runOnJS} from 'react-native-reanimated'

import {useGender} from 'src/hooks/useGender'
import {useIsPortrait} from 'src/hooks/useIsPortrait'
import {useGetBrandsBySexQuery, useGetTopBrandsQuery} from 'src/store/shopApi'
import {Color} from 'src/themes'
import {IS_IOS} from 'src/variables'

import {TopBrandItem} from './TopBrandItem'

import {BrandGroupTitle} from '../ui/BrandGroupTitle'
import {BrandRowItem} from '../ui/BrandRowItem'
import {Header} from '../ui/Header'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {SelectorTwoOptions} from '../ui/SelectorTwoOptions'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'

interface HomeBrandsProps {
  onPressBrand?: (brand: any) => void
}

export function HomeBrands({onPressBrand}: HomeBrandsProps) {
  const {isMenSelected, onChangeGender, values} = useGender()
  const {isPortrait} = useIsPortrait()

  const allBrands = useGetBrandsBySexQuery(isMenSelected ? 'men' : 'women')
  const topBrands = useGetTopBrandsQuery(isMenSelected)

  const listRef = useRef<SectionList>(null)

  const handleScrollToLetter = useMemo(() => {
    let prevId: number

    return (id: number) => {
      if (prevId !== id) {
        listRef.current?.scrollToLocation({
          animated: false,
          itemIndex: IS_IOS ? 1 : 0,
          sectionIndex: id,
          viewPosition: 0,
        })
      }
      prevId = id
    }
  }, [])

  const topBrandIsLoading = topBrands.isLoading && topBrands.isFetching

  return (
    <>
      <Header title="Бренды" />
      {isPortrait && (
        <View style={styles.alphabetContainer}>
          <GestureDetector
            gesture={Gesture.Pan().onChange(e => {
              const newId = Math.max(
                Math.min(
                  Math.floor(e.y / 16),
                  (allBrands.currentData?.length ?? 1) - 1,
                ),
                0,
              )
              runOnJS(handleScrollToLetter)(newId)
            })}>
            <View>
              {(allBrands.currentData ?? []).map(({title}, id) => (
                <Pressable
                  key={id}
                  onPress={() => handleScrollToLetter(id)}
                  style={styles.alphabetLetterContainer}>
                  <Text color={Color.primary} gp3>
                    {title}
                  </Text>
                </Pressable>
              ))}
            </View>
          </GestureDetector>
        </View>
      )}
      <SelectorTwoOptions onChange={onChangeGender} values={values} />
      <Spacer height={8} />
      <SectionList
        ref={listRef}
        ListHeaderComponent={() => (
          <SafeLandscapeView additionalPadding={24}>
            <Spacer height={16} />
            <Text center cg2>
              ТОП-БРЕНДЫ
            </Text>
            <Spacer height={14} />
            <SafeLandscapeView additionalPadding={24}>
              <FlatList
                renderItem={({item}) => (
                  <TopBrandItem
                    onPress={onPressBrand}
                    isLoading={topBrandIsLoading}
                    item={item}
                  />
                )}
                style={styles.topBrandGap}
                columnWrapperStyle={styles.topBrandGap}
                keyExtractor={(item, id) => item.id ?? id}
                numColumns={3}
                data={
                  topBrands.currentData?.length && !topBrandIsLoading
                    ? topBrands.currentData
                    : ['', '', '', '', '', '']
                }
              />
            </SafeLandscapeView>
            <Spacer height={24} />
            <Text center cg2>
              ВСЕ БРЕНДЫ
            </Text>
          </SafeLandscapeView>
        )}
        renderItem={({item}) => (
          <BrandRowItem
            onPress={onPressBrand}
            isLoading={allBrands.isLoading}
            item={item}
          />
        )}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({section: {title}}) => (
          <BrandGroupTitle title={title} />
        )}
        ListFooterComponent={() => <Spacer height={46} />}
        keyExtractor={item => item.id}
        sections={allBrands.currentData ?? []}
        // sections={[{title: 'A',data: [{id: '1',name: 'AGNONA',},],},{title: 'B',data: [{id: '1',name: 'BARRETT',}, {id: '2',name: 'BILLIONAIRE',},{id: '3',name: 'BOGNER',},],},]}
      />
    </>
  )
}

const styles = StyleSheet.create({
  alphabetContainer: {
    height: '100%',
    justifyContent: 'center',
    maxHeight: '65%',
    width: 24,
    zIndex: 5,
    position: 'absolute',
    right: 0,
    top: '25%',
  },
  alphabetLetterContainer: {
    width: '100%',
    alignItems: 'center',
    height: 16,
  },
  topBrandGap: {
    gap: 8,
  },
})
