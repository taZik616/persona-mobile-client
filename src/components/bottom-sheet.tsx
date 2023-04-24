import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import {
  Animated as RNAnimated,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  Gesture,
  GestureDetector,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler'
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedKeyboard,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {initialWindowMetrics} from 'react-native-safe-area-context'

import {useAndroidStatusBarAnimation} from 'src/hooks'
import {useIsPortrait} from 'src/hooks/useIsPortrait'
import {Color} from 'src/themes'
import {sheetPointsT} from 'src/types'
import {
  ANIMATION_DURATION,
  ANIMATION_TYPE,
  IS_IOS,
  SCREEN_H,
  SCREEN_W,
} from 'src/variables'

import {CrossIcon} from './ui/icons/common'
import {SafeLandscapeView} from './ui/SafeLandscapeView'
import {Spacer} from './ui/Spacer'
import {Text} from './ui/Text'

export type BottomSheetProps = {
  children?: React.ReactNode
  title?: string
  onClose?: () => void
  closeDistance?: number
  showClose?: boolean
  rightIcon?: JSX.Element
  onPressRight?: () => void
  fillMax?: boolean
  hasBottomTabs?: boolean
  keyboardInsets?: number
}

export type BottomSheetRefType = {
  close?: () => void
  open?: () => void
}

const AnimatedStatusBar = RNAnimated.createAnimatedComponent(StatusBar)

// useSafeAreaInsets + useeWindowDimensions вызывают дофига лишних ре-рендеров
const topInsets = initialWindowMetrics?.insets.top ?? 0
const bottomInsets = initialWindowMetrics?.insets.bottom ?? 0
const useBottomSheetHeight = () => {
  const {isPortrait} = useIsPortrait()
  if (isPortrait) {
    return SCREEN_H - (topInsets + 84 + bottomInsets + 43)
  } else {
    return SCREEN_W - (84 + 63)
  }
}

export const BottomSheet = memo(
  forwardRef<BottomSheetRefType, BottomSheetProps>(
    (
      {
        children,
        onClose,
        title,
        onPressRight,
        rightIcon,
        showClose,
        closeDistance,
        fillMax,
        hasBottomTabs = true, // Фиксит клавиатуру
        keyboardInsets,
      },
      ref,
    ) => {
      const [isVisible, setIsVisible] = useState(false)
      const bottomSheetHeight = useBottomSheetHeight()
      const snapPointFromTop: sheetPointsT = [0, bottomSheetHeight]

      const fullyOpenSnapPoint = snapPointFromTop[0]
      const closedSnapPoint = snapPointFromTop[snapPointFromTop.length - 1]
      const mockedSnapPointFromTop: sheetPointsT = [
        fullyOpenSnapPoint,
        closeDistance ? closeDistance * 2 : closedSnapPoint,
      ]

      const panGestureRef = useRef(Gesture.Pan())
      const blockScrollUntilAtTheTopRef = useRef(Gesture.Tap())
      const [snapPoint, setSnapPoint] = useState(closedSnapPoint)
      const translationY = useSharedValue(0)
      const scrollOffset = useSharedValue(0)
      const bottomSheetTranslateY = useSharedValue(closedSnapPoint)

      const onHandlerEndOnJS = (point: number) => {
        setSnapPoint(point)
      }

      const onHandlerEnd = ({velocityY}: PanGestureHandlerEventPayload) => {
        'worklet'
        const dragToss = 0.05
        const endOffsetY =
          bottomSheetTranslateY.value +
          translationY.value +
          velocityY * dragToss

        let destSnapPoint = fullyOpenSnapPoint

        if (
          snapPoint === fullyOpenSnapPoint &&
          endOffsetY < fullyOpenSnapPoint
        ) {
          return
        }

        mockedSnapPointFromTop.forEach((point, id) => {
          const distFromSnap = Math.abs(point - endOffsetY)
          if (distFromSnap < Math.abs(destSnapPoint - endOffsetY)) {
            destSnapPoint = snapPointFromTop[id]
          }
        })

        bottomSheetTranslateY.value =
          bottomSheetTranslateY.value + translationY.value
        translationY.value = 0

        bottomSheetTranslateY.value = withTiming(
          destSnapPoint,
          {
            duration: ANIMATION_DURATION,
          },
          success => {
            if (destSnapPoint === closedSnapPoint && success) {
              runOnJS(setIsVisible)(false)
              onClose && runOnJS(onClose)()
            }
          },
        )
        runOnJS(onHandlerEndOnJS)(destSnapPoint)
      }

      const clampedTranslateY = useDerivedValue(() => {
        const translateY = bottomSheetTranslateY.value + translationY.value

        const minTranslateY = Math.max(fullyOpenSnapPoint, translateY)
        return Math.min(closedSnapPoint, minTranslateY)
      })
      const {toDark, toLight, backgroundColor} = useAndroidStatusBarAnimation({
        animatedValueRange: snapPointFromTop,
      })

      const panGesture = Gesture.Pan()
        .onUpdate(e => {
          if (snapPoint === fullyOpenSnapPoint) {
            translationY.value = e.translationY - scrollOffset.value
          } else {
            translationY.value = e.translationY
          }
        })
        .onEnd(onHandlerEnd)
        .withRef(panGestureRef)

      const blockScrollUntilAtTheTop = Gesture.Tap()
        .maxDeltaY(snapPoint - fullyOpenSnapPoint)
        .maxDuration(100000)
        .simultaneousWithExternalGesture(panGesture)
        .withRef(blockScrollUntilAtTheTopRef)

      const headerGesture = Gesture.Pan()
        .onUpdate(e => {
          translationY.value = e.translationY
        })
        .onEnd(onHandlerEnd)

      const scrollViewGesture = Gesture.Native().requireExternalGestureToFail(
        blockScrollUntilAtTheTop,
      )

      const onClosePopup = useCallback(() => {
        toLight()
        bottomSheetTranslateY.value = withTiming(
          closedSnapPoint,
          {
            duration: ANIMATION_DURATION,
            easing: ANIMATION_TYPE,
          },
          () => {
            runOnJS(setIsVisible)(false)
            onClose && runOnJS(onClose)()
          },
        )
      }, [bottomSheetTranslateY, closedSnapPoint, onClose, toLight])

      const onOpenPopup = useCallback(() => {
        setIsVisible(true)
        toDark()
        bottomSheetTranslateY.value = withTiming(fullyOpenSnapPoint, {
          duration: ANIMATION_DURATION,
          easing: ANIMATION_TYPE,
        })
      }, [bottomSheetTranslateY, fullyOpenSnapPoint, toDark])

      useImperativeHandle(ref, () => ({
        open: onOpenPopup,
        close: onClosePopup,
      }))

      const backgroundAnimatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
          clampedTranslateY.value,
          snapPointFromTop,
          [1, 0],
        )
        return {
          opacity,
        }
      })

      const bottomSheetStyle = useAnimatedStyle(() => {
        return {
          maxHeight: bottomSheetHeight,
          minHeight: fillMax && IS_IOS ? bottomSheetHeight : undefined,
          transform: [{translateY: clampedTranslateY.value}],
        }
      }, [fillMax])

      const keyboard = useAnimatedKeyboard()
      const keyboardSafe = useAnimatedStyle(() => ({
        height: hasBottomTabs
          ? Math.max(keyboard.height.value - 65, 0)
          : Math.max(keyboard.height.value - (keyboardInsets ?? 0), 0),
      }))

      if (!isVisible) return <></>
      return (
        <View style={[StyleSheet.absoluteFill, styles.container]}>
          <AnimatedStatusBar backgroundColor={backgroundColor} />
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              styles.background,
              backgroundAnimatedStyle,
            ]}
          />
          <Animated.View
            style={[styles.animateView, styles.content, bottomSheetStyle]}>
            <GestureDetector gesture={headerGesture}>
              <SafeLandscapeView safeArea>
                <Spacer height={10} />
                <View style={styles.headerLine} />
                <Spacer height={16} />
                <View style={styles.rowContainer}>
                  <View style={styles.flexOne}>
                    {showClose && (
                      <TouchableOpacity onPress={onClosePopup}>
                        <CrossIcon />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styles.textContainer}>
                    <Text cg2>{title}</Text>
                  </View>
                  <View style={styles.flexOne}>
                    <View style={styles.rightButtons}>
                      {rightIcon && (
                        <TouchableOpacity onPress={onPressRight}>
                          {rightIcon}
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
                <Spacer height={10} />
              </SafeLandscapeView>
            </GestureDetector>
            <GestureDetector
              gesture={Gesture.Simultaneous(panGesture, scrollViewGesture)}>
              <Animated.ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={1}
                onScrollBeginDrag={e => {
                  scrollOffset.value = e.nativeEvent.contentOffset.y
                }}>
                {children}
                <Animated.View style={keyboardSafe} />
              </Animated.ScrollView>
            </GestureDetector>
          </Animated.View>
        </View>
      )
    },
  ),
)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    zIndex: 5,
  },
  headerLine: {
    backgroundColor: Color.border,
    height: 2,
    width: 24,
    borderRadius: 20,
    alignSelf: 'center',
  },
  space: {flex: 1},
  background: {
    backgroundColor: Color.darkOpacity,
  },
  animateView: {
    justifyContent: 'flex-end',
  },
  content: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Color.bg,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
  },
  rightButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  flexOne: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    alignSelf: 'center',
  },
})
