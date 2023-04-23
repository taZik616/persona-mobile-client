import React, {forwardRef, memo, useEffect, useImperativeHandle} from 'react'

import MaskedView from '@react-native-masked-view/masked-view'
import {StyleSheet, View} from 'react-native'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withTiming,
} from 'react-native-reanimated'

import {vibration} from 'src/services/vibration'
import {Color} from 'src/themes'

import {Text} from './Text'

export const ITEM_HEIGHT = 32
export const VISIBLE_ITEMS = 5

const perspective = 600
const RADIUS_REL = VISIBLE_ITEMS * 0.5
const COUNT_PER_SIDE = Math.floor(RADIUS_REL)
const RADIUS = RADIUS_REL * ITEM_HEIGHT

type valType = {value: number; label: string}

interface WheelPickerProps {
  values: valType[]
  onChange?: ({value, label}: valType) => void
}

export interface WheelPickerRefType {
  getSelected: () => valType
}

export const WheelPicker = memo(
  forwardRef<WheelPickerRefType, WheelPickerProps>(
    ({values, onChange}, ref) => {
      const y = useSharedValue(ITEM_HEIGHT * COUNT_PER_SIDE)
      const prevY = useSharedValue(0)
      const choiceId = useSharedValue(0)
      const minScroll = ITEM_HEIGHT * COUNT_PER_SIDE
      const maxScroll = -(
        values.length * ITEM_HEIGHT -
        ITEM_HEIGHT * (COUNT_PER_SIDE + 1)
      )

      useImperativeHandle(ref, () => ({
        getSelected: () => values[choiceId.value],
      }))

      const animStyle = useAnimatedStyle(() => ({
        transform: [{translateY: y.value}], //, {},
      }))

      useEffect(() => {
        onChange?.(values[choiceId.value])
      }, [])

      const handleSelect = (id: number) => {
        onChange?.(values[id])
        vibration.selection()
      }

      return (
        <View style={styles.container}>
          <MaskedView
            style={styles.mask}
            maskElement={
              <Animated.View style={animStyle}>
                {values.map((v, i) => (
                  <MaskElement value={v} anim={y} index={i} />
                ))}
              </Animated.View>
            }>
            <View style={styles.inactiveSelection} />
            <View
              style={{height: ITEM_HEIGHT, backgroundColor: Color.primaryBlack}}
            />
            <View style={styles.inactiveSelection} />
          </MaskedView>
          <View style={styles.selectionLine} />
          <GestureDetector
            gesture={Gesture.Pan()
              .onStart(() => {
                prevY.value = y.value - ITEM_HEIGHT * COUNT_PER_SIDE
              })
              .onChange(event => {
                y.value = Math.max(
                  Math.min(
                    event.translationY +
                      ITEM_HEIGHT * COUNT_PER_SIDE +
                      prevY.value,
                    minScroll,
                  ),
                  maxScroll,
                )

                const id = Math.round(-y.value / ITEM_HEIGHT) + COUNT_PER_SIDE
                if (choiceId.value !== id) {
                  choiceId.value = id
                  runOnJS(handleSelect)(id)
                }
              })
              .onEnd(e => {
                y.value = withDecay(
                  {
                    velocity: e.velocityY,
                    clamp: [maxScroll, minScroll],
                  },
                  () => {
                    const id =
                      Math.round(-y.value / ITEM_HEIGHT) + COUNT_PER_SIDE
                    y.value = withTiming((id - COUNT_PER_SIDE) * -ITEM_HEIGHT)
                    if (choiceId.value !== id) {
                      choiceId.value = id
                      runOnJS(handleSelect)(id)
                    }
                  },
                )
              })}>
            <View style={[StyleSheet.absoluteFill, styles.gestureDetector]} />
          </GestureDetector>
        </View>
      )
    },
  ),
)

interface MaskElementProps {
  value: {
    value: number
    label: string
  }
  index: number
  anim: SharedValue<number>
}

const MaskElement = memo(({value, index, anim}: MaskElementProps) => {
  const animStyle = useAnimatedStyle(() => {
    const animVal = interpolate(
      (anim.value - ITEM_HEIGHT * COUNT_PER_SIDE) / -ITEM_HEIGHT,
      [index - RADIUS_REL, index, index + RADIUS_REL],
      [-1, 0, 1],
      Extrapolate.CLAMP,
    )
    const rotateX = Math.asin(animVal)
    const z = RADIUS * Math.cos(rotateX) - RADIUS

    return {
      transform: [
        {perspective},
        {rotateX: `${rotateX * 60}deg`},
        {scale: perspective / (perspective - z)},
      ], //, {},
    }
  })

  return (
    <Animated.View key={index} style={[styles.item, animStyle]}>
      <Text center gp2>
        {value.label}
      </Text>
    </Animated.View>
  )
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    overflow: 'hidden',
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
  },
  inactiveSelection: {
    height: ITEM_HEIGHT * COUNT_PER_SIDE,
    backgroundColor: Color.primaryGray,
    opacity: 0.5,
  },
  selectionLine: {
    marginTop: ITEM_HEIGHT * COUNT_PER_SIDE,
    height: ITEM_HEIGHT,
    //borderRadius: ITEM_HEIGHT / 4,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Color.secondaryGray,
    position: 'absolute',
    width: '80%',
    maxWidth: 600,
    alignSelf: 'center',
    //backgroundColor: Color.primary,
  },
  mask: {zIndex: 5},
  gestureDetector: {zIndex: 10},
})
