import React, {memo} from 'react'

import {StyleSheet, View} from 'react-native'

import {Color} from 'src/themes'

import {BlockSkeleton} from './Block'

import {Button} from '../Button'
import {Spacer} from '../Spacer'
import {Swiper} from '../Swiper'
import {Text} from '../Text'

interface ProductDetailSkeletonProps {
  hasError: boolean
  onRetry?: () => void
}

export const ProductDetailSkeleton = memo(
  ({hasError, onRetry}: ProductDetailSkeletonProps) => {
    return (
      <View style={styles.container}>
        {hasError ? (
          <View style={styles.errorContainer}>
            <Text center color={Color.primaryGray} gp4>
              Не удалось загрузить данные
            </Text>
            <Button variant="secondaryFilled" onPress={onRetry}>
              Попробовать снова
            </Button>
          </View>
        ) : (
          <>
            <Swiper images={['', '', '', '']} type="card-image-skeleton" />
            <Spacer height={16} />
            <BlockSkeleton height={56} />
            <Spacer height={28} />
            <BlockSkeleton height={40} />
            <Spacer height={16} />
            <BlockSkeleton height={14} />
            <Spacer height={4} />
            <BlockSkeleton height={14} />
            <Spacer height={4} />
            <BlockSkeleton height={14} />
          </>
        )}
      </View>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
