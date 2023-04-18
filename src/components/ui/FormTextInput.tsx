import React from 'react'

import {Controller, useFormContext} from 'react-hook-form'
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native'
import Animated, {FadeInLeft} from 'react-native-reanimated'

import {Color} from 'src/themes'

import {Text} from './Text'

interface FormTextInputProps
  extends Omit<
    TextInputProps,
    | 'ref'
    | 'onBlur'
    | 'blurOnSubmit'
    | 'onChangeText'
    | 'onSubmitEditing'
    | 'value'
    | 'returnKeyType'
  > {
  name: string
  nextField?: string
}

export const FormTextInput = ({
  style,
  name,
  editable = true,
  nextField,
  ...textInputProps
}: FormTextInputProps) => {
  const {
    control,
    setFocus,
    formState: {errors},
  } = useFormContext()
  const error = errors[name]
  return (
    <View>
      <Controller
        name={name}
        render={({field: {onChange, onBlur, ref, value}}) => {
          return (
            <TextInput
              ref={ref}
              onBlur={onBlur}
              style={[styles.input, style]}
              blurOnSubmit
              onChangeText={onChange}
              onSubmitEditing={
                nextField ? () => setFocus(nextField) : undefined
              }
              editable={editable}
              value={value}
              selectionColor={Color.primary}
              keyboardType="default"
              placeholderTextColor={Color.primaryGray}
              returnKeyType={nextField ? 'next' : 'default'}
              {...textInputProps}
            />
          )
        }}
        control={control}
      />
      {!editable && (
        <Animated.View entering={FadeInLeft}>
          <Text gp1 style={styles.errorText} color={Color.textYellow1}>
            Поле нельзя редактировать
          </Text>
        </Animated.View>
      )}
      {error && (
        <Animated.View entering={FadeInLeft}>
          <Text gp1 style={styles.errorText} color={Color.textRed1}>
            {error.message as string}
          </Text>
        </Animated.View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: Color.inputBg,
    fontFamily: 'GothamPro',
    fontSize: 13,
    color: Color.primaryBlack,
  },
  errorText: {
    width: '100%',
    marginHorizontal: 10,
    marginTop: 6,
    lineHeight: 14,
    flexWrap: 'wrap',
  },
})
