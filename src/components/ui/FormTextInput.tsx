import React from 'react'

import {Controller, useFormContext} from 'react-hook-form'
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native'

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
              blurOnSubmit={true}
              onChangeText={onChange}
              onSubmitEditing={() => nextField && setFocus(nextField)}
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
      {error && (
        <Text gp1 style={styles.errorText} color={Color.textRed1}>
          {error.message as string}
        </Text>
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
