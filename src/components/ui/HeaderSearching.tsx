import React, {memo, useEffect, useState} from 'react'

import {Keyboard, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import Animated, {
  Easing,
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import Feather from 'react-native-vector-icons/Feather'
import {Spacer, Text} from 'ui/index'

import {Color} from 'src/themes'

const AnimTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
const AnimFeather = Animated.createAnimatedComponent(Feather)
const AnimTextInput = Animated.createAnimatedComponent(TextInput)

interface SearchingContentProps {
  onSubmit?: (value: string) => void
  onCancel?: () => void
}

const EASING = Easing.out(Easing.circle)

export const HeaderSearching = memo(
  ({onCancel, onSubmit}: SearchingContentProps) => {
    const [searchValue, setSearchValue] = useState('')
    const width = useSharedValue(20)

    useEffect(() => {
      width.value = withTiming(100, {
        easing: EASING,
        duration: 400,
      })
      Keyboard.addListener('keyboardWillHide', () => {
        onCancel?.()
      })
    }, [])

    const animContainer = useAnimatedStyle(() => ({
      width: `${width.value}%`,
    }))

    const opacityAnim = useAnimatedStyle(() => ({
      opacity: interpolate(width.value, [20, 100], [0, 1]),
    }))

    return (
      <Animated.View
        exiting={FadeOut.duration(150)}
        style={[styles.rowContainer, animContainer]}>
        <Animated.View style={styles.inputContainer}>
          <Spacer width={14} />
          <AnimFeather
            name="search"
            style={opacityAnim}
            size={20}
            color={Color.primaryGray}
          />
          <Spacer width={8} />
          <AnimTextInput
            selectionColor={Color.primary}
            autoFocus
            style={[styles.searchInput, opacityAnim]}
            placeholderTextColor={Color.primaryGray}
            placeholder="Поиск"
            onSubmitEditing={() => onSubmit?.(searchValue)}
            value={searchValue}
            onChangeText={setSearchValue}
          />
          <Spacer width={14} />
        </Animated.View>
        <Spacer width={16} />
        <AnimTouchableOpacity onPress={onCancel}>
          <Text color={Color.primary} gp4>
            Отмена
          </Text>
        </AnimTouchableOpacity>
      </Animated.View>
    )
  },
)

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: Color.inputBg,
    height: 40,
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 13,
    fontFamily: 'GothamPro',
    color: Color.primaryBlack,
  },
})
