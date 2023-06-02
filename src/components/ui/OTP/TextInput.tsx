import React from 'react'

import {StyleSheet, View} from 'react-native'
// @ts-ignore
import OTPTextInputRN from 'react-native-otp-textinput'

import {Color} from 'src/themes'

interface OTPTextInputProps {
  handleTextChange: (code: string) => void
}

export const OTPTextInput = ({handleTextChange}: OTPTextInputProps) => {
  return (
    <View style={styles.otpContainer}>
      <OTPTextInputRN
        textInputStyle={styles.otpInputContainerStyle}
        tintColor={Color.primary}
        handleTextChange={handleTextChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  otpContainer: {
    borderWidth: 1,
    borderColor: Color.secondaryGray,
    borderRadius: 8,
    padding: 16,
  },
  otpInputContainerStyle: {
    backgroundColor: Color.secondaryGray,
    borderRadius: 8,
    borderBottomWidth: 0,
    flex: 1,
  },
})
