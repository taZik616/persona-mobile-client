import React, {memo} from 'react'

import {StyleSheet, TouchableOpacity, View} from 'react-native'

import {hexColorWithOpacity} from 'src/helpers'
import {useTypedDispatch} from 'src/store'
import {closeHint, useIsHintClosed} from 'src/store/hintSlice'
import {Color} from 'src/themes'

import {Spacer} from './Spacer'
import {Text} from './Text'

interface HintProps {
  id: string
  content: string
  spaceTop?: number
  spaceBottom?: number
}

export const Hint = memo(({id, content, spaceTop, spaceBottom}: HintProps) => {
  const isClosed = useIsHintClosed(id)
  const dispatch = useTypedDispatch()

  const onPressOk = () => {
    dispatch(closeHint(id))
  }

  if (isClosed) return null
  return (
    <View
      style={[
        styles.container,
        {marginBottom: spaceBottom, marginTop: spaceTop},
      ]}>
      <Text gp1>{content}</Text>
      <Spacer height={4} />
      <TouchableOpacity style={styles.ok} onPress={onPressOk}>
        <Text color={Color.primary} gp4>
          ОК
        </Text>
      </TouchableOpacity>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: hexColorWithOpacity(Color.primary, 0.1),
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  ok: {alignSelf: 'center'},
})
