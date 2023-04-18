import React, {useCallback, useState} from 'react'

import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import {format} from 'date-fns'
import {Controller} from 'react-hook-form'
import {Pressable, StyleSheet} from 'react-native'
import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated'

import {Color} from 'src/themes'
import {IS_IOS, YEAR_IN_MS} from 'src/variables'

import {Text} from './Text'

interface FormDateTimeProps {
  placeholder?: string
  name: string
  isTime?: boolean
  maximumDate?: Date
}

export const FormDateTime = ({
  name,
  placeholder,
  isTime,
  maximumDate,
}: FormDateTimeProps) => {
  const [showPicker, setShowPicker] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const onPressInput = useCallback(() => setShowPicker(pr => !pr), [])
  const textColor = hasChanges ? Color.primaryBlack : Color.primaryGray
  return (
    <>
      <Controller
        name={name}
        render={({
          field: {onChange, value = new Date(Date.now() - 10 * YEAR_IN_MS)},
        }) => {
          const onPickDate = (
            event: DateTimePickerEvent,
            date: Date | undefined,
          ) => {
            const {type} = event
            if (type === 'set' && date) {
              if (!hasChanges) setHasChanges(true)
              onChange(date)
            } else if (type === 'dismissed') {
              setShowPicker(false)
            }
          }
          const onPickTime = (
            event: DateTimePickerEvent,
            date: Date | undefined,
          ) => {
            const {type} = event
            if (type === 'set' && date) {
              if (!hasChanges) setHasChanges(true)
              onChange(date)
            } else if (type === 'dismissed') {
              setShowPicker(false)
            }
          }
          return (
            <>
              {isTime ? (
                <Pressable style={styles.container} onPress={onPressInput}>
                  <Text gp4 numberOfLines={1} color={textColor}>
                    {hasChanges || value ? format(value, 'HH:mm') : placeholder}
                  </Text>
                </Pressable>
              ) : (
                <Pressable style={styles.container} onPress={onPressInput}>
                  <Text gp4 numberOfLines={1} color={textColor}>
                    {hasChanges || value
                      ? format(value, 'dd.MM.yyyy')
                      : placeholder}
                  </Text>
                </Pressable>
              )}
              {showPicker && (
                <Animated.View
                  entering={IS_IOS ? FadeInUp : undefined}
                  exiting={IS_IOS ? FadeOutUp : undefined}>
                  {isTime ? (
                    <DateTimePicker
                      mode="time"
                      display="spinner"
                      onChange={onPickTime}
                      value={value}
                    />
                  ) : (
                    <DateTimePicker
                      mode="date"
                      display="spinner"
                      onChange={onPickDate}
                      value={value}
                      maximumDate={maximumDate}
                    />
                  )}
                </Animated.View>
              )}
            </>
          )
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: '100%',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: Color.inputBg,
  },
})
