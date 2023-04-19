import React, {useRef} from 'react'

import {StyleSheet} from 'react-native'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler'
import Animated, {
  WithSpringConfig,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import {clamp, snapPoint} from 'react-native-redash'

import {vibration} from 'src/services/vibration'
import {Color} from 'src/themes'

type SwitchProps = {
  initialValue?: boolean
  onChange?: (value: boolean) => void
  activeColor?: string
}
const SWITCH_CONTAINER_WIDTH = 64
const CIRCLE_WIDTH = 28
const BORDER = 2

const TRACK_CIRCLE_WIDTH = SWITCH_CONTAINER_WIDTH - CIRCLE_WIDTH - BORDER * 2

const config: WithSpringConfig = {
  overshootClamping: true,
}

export const Switch = ({
  initialValue,
  onChange,
  activeColor = Color.primary,
}: SwitchProps) => {
  const isToggled = useRef(initialValue ?? false)
  const translateX = useSharedValue(initialValue ? TRACK_CIRCLE_WIDTH : 0)

  const onPress = ({
    nativeEvent: {state},
  }: TapGestureHandlerStateChangeEvent) => {
    if (state !== State.ACTIVE) return
    const newVal = !isToggled.current
    isToggled.current = newVal
    onChange?.(newVal)
    vibration.selection()
    translateX.value = withSpring(!newVal ? 0 : TRACK_CIRCLE_WIDTH, config)
  }
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
      width: interpolate(
        translateX.value,
        [0, TRACK_CIRCLE_WIDTH / 3, TRACK_CIRCLE_WIDTH],
        [CIRCLE_WIDTH, (CIRCLE_WIDTH / 2) * 2.5, CIRCLE_WIDTH],
      ),
    }
  })
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        translateX.value,
        [0, TRACK_CIRCLE_WIDTH],
        [Color.switchBg, activeColor],
      ),
    }
  })

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number}
  >({
    onStart: (_e, ctx) => {
      ctx.x = translateX.value
    },
    onActive: ({translationX}, ctx) => {
      translateX.value = clamp(translationX + ctx.x, 0, TRACK_CIRCLE_WIDTH)
    },
    onEnd: ({velocityX}) => {
      const selectedSnapPoint = snapPoint(translateX.value, velocityX, [
        0,
        TRACK_CIRCLE_WIDTH,
      ])
      runOnJS(vibration.selection)()
      translateX.value = withSpring(selectedSnapPoint, config)
      onChange && runOnJS(onChange)(selectedSnapPoint !== 0)
    },
  })

  const panRef = useRef<PanGestureHandler>(null)

  return (
    <TapGestureHandler waitFor={panRef} onHandlerStateChange={onPress}>
      <Animated.View style={[animatedContainerStyle, styles.switchContainer]}>
        <PanGestureHandler ref={panRef} onGestureEvent={onGestureEvent}>
          <Animated.View style={[animatedStyle, styles.circle]} />
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  )
}

const styles = StyleSheet.create({
  switchContainer: {
    width: SWITCH_CONTAINER_WIDTH,
    borderRadius: 999,
    padding: BORDER,
    flexDirection: 'row',
  },
  circle: {
    alignSelf: 'center',
    width: CIRCLE_WIDTH,
    height: CIRCLE_WIDTH,
    borderRadius: 999,
    backgroundColor: Color.white,
  },
})
