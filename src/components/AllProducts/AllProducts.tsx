import React, {memo} from 'react'

import {useTypedRoute} from 'src/hooks'
import {useGender} from 'src/hooks/useGender'

import {Header} from '../ui/Header'
import {RenderProductList} from '../ui/RenderProductList'
import {SelectorTwoOptions} from '../ui/SelectorTwoOptions'
import {Spacer} from '../ui/Spacer'

export const AllProducts = memo(() => {
  const {isMenSelected, onChangeGender, values} = useGender()
  const {showGenderSelect, ...queryParams} =
    useTypedRoute<'allProducts'>().params || {}

  return (
    <>
      <Header showBack />
      {showGenderSelect ? (
        <>
          <Spacer height={8} />
          <SelectorTwoOptions
            isSecondActive={isMenSelected}
            onChange={onChangeGender}
            values={values}
          />
          <Spacer height={8} />
        </>
      ) : (
        <></>
      )}
      <RenderProductList {...queryParams} showCounter />
    </>
  )
})
