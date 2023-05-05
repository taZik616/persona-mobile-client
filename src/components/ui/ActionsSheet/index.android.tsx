import React, {memo, useEffect} from 'react'

import {Keyboard, StyleSheet, View, useWindowDimensions} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import Animated, {
  Easing,
  WithTimingConfig,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import {Color} from 'src/themes'

import {ActionsSheetProps} from '.'
import {Text} from '../Text'

const timingOutAnimationConfig: WithTimingConfig = {
  duration: 250,
  easing: Easing.in(Easing.quad),
}

const timingInAnimationConfig: WithTimingConfig = {
  duration: 250,
  easing: Easing.out(Easing.quad),
}

export const ActionsSheet = memo(
  ({
    firstOpt,
    onPressFirstOpt,
    secondOpt,
    onCancel,
    onPressSecondOpt,
    title,
  }: ActionsSheetProps) => {
    const {height: H} = useWindowDimensions()

    const fullyOpen = 0
    const fullyClosed = H * 0.45

    const fadeAnim = useSharedValue(fullyClosed)

    const fadeOut = (endCallback?: () => void) => {
      const onEnd = () => endCallback?.()
      fadeAnim.value = withTiming(fullyClosed, timingOutAnimationConfig, () =>
        runOnJS(onEnd)(),
      )
    }

    useEffect(() => {
      Keyboard.dismiss()
      fadeAnim.value = withTiming(fullyOpen, timingInAnimationConfig)
    }, [fadeAnim])

    const bgAnimation = useAnimatedStyle(() => ({
      opacity: interpolate(fadeAnim.value, [fullyOpen, fullyClosed], [0.5, 0]),
    }))

    const slideFromBottomAnimation = useAnimatedStyle(() => ({
      transform: [{translateY: fadeAnim.value}],
    }))

    const handleSecondOpt = () => fadeOut(onPressSecondOpt)

    const handleFirstOpt = () => fadeOut(onPressFirstOpt)

    const handleCancel = () => fadeOut(onCancel)

    return (
      <View style={StyleSheet.absoluteFillObject}>
        <Animated.View style={[styles.animateView, bgAnimation]} />
        <Animated.View
          style={[styles.animateViewFade, slideFromBottomAnimation]}>
          <View style={styles.top}>
            {title && (
              <Text color={Color.primaryGray} gp1 style={styles.t8}>
                {title}
              </Text>
            )}
            <View style={styles.line} />
            <TouchableOpacity style={styles.margin} onPress={handleFirstOpt}>
              <Text color={Color.textBlue1} gp5>
                {firstOpt}
              </Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity style={styles.margin} onPress={handleSecondOpt}>
              <Text color={Color.textBlue1} gp5>
                {secondOpt}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity style={styles.margin} onPress={handleCancel}>
              <Text color={Color.textRed1} gp5>
                Отмена
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    )
  },
)

const styles = StyleSheet.create({
  top: {
    borderRadius: 13,
    backgroundColor: Color.bg,
  },
  bottom: {
    borderRadius: 13,
    overflow: 'hidden',
    backgroundColor: Color.bg,
    marginVertical: 8,
  },
  animateView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Color.darkOpacity,
  },
  animateViewFade: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
  },
  t8: {
    marginHorizontal: 16,
    marginVertical: 12,
    textAlign: 'center',
  },
  line: {
    width: '100%',
    height: 0.3,
    backgroundColor: Color.border,
  },
  margin: {
    paddingVertical: 18,
    width: '100%',
    alignItems: 'center',
  },
})
