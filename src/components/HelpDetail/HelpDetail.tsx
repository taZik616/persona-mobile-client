import React from 'react'

import {ScrollView, StyleSheet} from 'react-native'

import {ConnectionError} from '../ui/ConnectionError'
import {Header} from '../ui/Header'
import {Loading} from '../ui/Loading'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'

interface HelpDetailProps {
  title: string
  isLoading: boolean
  isError?: boolean
  onPressBack?: () => void
  onPressRetry?: () => void
  content?: string
}

export const HelpDetail = ({
  title,
  content,
  isLoading,
  isError,
  onPressBack,
  onPressRetry,
}: HelpDetailProps) => {
  return (
    <>
      <Header
        title={title}
        onPressBack={onPressBack}
        showBack
        hideBasket
        hideSearch
      />
      <ScrollView style={styles.flexOne}>
        <SafeLandscapeView style={styles.flexOne} safeArea>
          {isLoading ? (
            <>
              <Spacer height={120} />
              <Loading />
            </>
          ) : !isError ? (
            <>
              <Text gp4>{content}</Text>
              <Spacer withBottomInsets height={24} />
            </>
          ) : (
            <ConnectionError onPressRetry={onPressRetry} />
          )}
        </SafeLandscapeView>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
})
