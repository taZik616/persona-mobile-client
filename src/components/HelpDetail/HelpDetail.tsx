import React from 'react'

import {ScrollView, StyleSheet} from 'react-native'
import Markdown from 'react-native-markdown-display'

import {useMarkdownProps} from 'src/hooks'

import {
  ConnectionError,
  Header,
  Loading,
  SafeLandscapeView,
  Spacer,
} from 'ui/index'

interface HelpDetailProps {
  title: string
  isLoading: boolean
  isError?: boolean
  error: string
  onPressRetry?: () => void
  content?: string
}

export const HelpDetail = ({
  title,
  content,
  isLoading,
  isError,
  error,
  onPressRetry,
}: HelpDetailProps) => {
  const mdProps = useMarkdownProps(0.3)
  return (
    <>
      <Header title={title} showBack hideBasket hideSearch />
      <ScrollView style={styles.flexOne}>
        <SafeLandscapeView style={styles.flexOne} safeArea>
          {isLoading ? (
            <>
              <Spacer height={120} />
              <Loading />
            </>
          ) : !isError ? (
            <>
              <Markdown {...mdProps}>{content}</Markdown>
              <Spacer withBottomInsets height={48} />
            </>
          ) : (
            <ConnectionError error={error} onPressRetry={onPressRetry} />
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
