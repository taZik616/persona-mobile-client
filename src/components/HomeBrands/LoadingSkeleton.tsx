import React, {memo} from 'react'

import {useWindowDimensions} from 'react-native'

import {useHorizontalMargins} from 'src/hooks/useHorizontalMargins'

import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {BlockSkeleton} from '../ui/Skeletons/Block'
import {Spacer} from '../ui/Spacer'

export const LoadingSkeleton = memo(() => {
  const {width} = useWindowDimensions()
  const {marginRight, marginLeft} = useHorizontalMargins({safeArea: true})
  const activeW = width - (marginRight + marginLeft)

  const generateSection = (items: number) => {
    const arr = Array(items).fill('')
    return (
      <>
        <Spacer height={16} />
        <BlockSkeleton borderRadius={6} width={38} height={30} />
        <Spacer height={12} />
        {arr.map((a, id: any) => (
          <React.Fragment key={id}>
            <BlockSkeleton
              borderRadius={6}
              height={40}
              lineWidth={activeW / 4}
              width={activeW}
            />
            <Spacer height={16} />
          </React.Fragment>
        ))}
      </>
    )
  }

  return (
    <SafeLandscapeView safeArea>
      {generateSection(2)}
      {generateSection(1)}
      {generateSection(4)}
      {generateSection(8)}
    </SafeLandscapeView>
  )
})
