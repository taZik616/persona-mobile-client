import React from 'react'

import {ScrollView, StyleSheet} from 'react-native'
import Markdown from 'react-native-markdown-display'

import {useMarkdownProps} from 'src/hooks'

import {ConnectionError} from '../ui/ConnectionError'
import {Header} from '../ui/Header'
import {Loading} from '../ui/Loading'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'

interface HelpDetailProps {
  title: string
  isLoading: boolean
  isError?: boolean
  onPressRetry?: () => void
  content?: string
}

export const HelpDetail = ({
  title,
  content,
  isLoading,
  isError,
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
