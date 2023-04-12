import React, {memo} from 'react'

import {Pressable, StyleSheet, View} from 'react-native'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import {runOnJS} from 'react-native-reanimated'

import {useIsPortrait} from 'src/hooks/useIsPortrait'
import {Color} from 'src/themes'

import {Text} from '../ui/Text'

interface AlphabetVerticalSelectorProps {
  onChangeLetter: (id: number) => () => void
  data?: {
    title: string
    [name: string]: any
  }[]
}

export const AlphabetVerticalSelector = memo(
  ({data = [], onChangeLetter}: AlphabetVerticalSelectorProps) => {
    const {isPortrait} = useIsPortrait()

    const onChangeLetterFromWorklet = (id: number) => onChangeLetter(id)()

    if (!isPortrait) return <></>
    return (
      <View style={styles.alphabetContainer}>
        <GestureDetector
          gesture={Gesture.Pan().onChange(e => {
            const newId = Math.max(
              Math.min(Math.floor(e.y / 16), (data.length ?? 1) - 1),
              0,
            )
            runOnJS(onChangeLetterFromWorklet)(newId)
          })}>
          <View>
            {data.map(({title}, id) => (
              <Pressable
                key={id}
                onPress={onChangeLetter(id)}
                style={styles.alphabetLetterContainer}>
                <Text color={Color.primary} gp3>
                  {title}
                </Text>
              </Pressable>
            ))}
          </View>
        </GestureDetector>
      </View>
    )
  },
)
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
})
