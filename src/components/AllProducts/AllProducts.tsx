import React, {memo} from 'react'

import {Header, SelectorTwoOptions, Spacer} from 'ui/index'
import {ProductList} from 'ui/product-list'

import {useTypedRoute} from 'src/hooks'
import {useGender} from 'src/hooks/useGender'

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
      <ProductList
        {...queryParams}
        gender={isMenSelected ? 'men' : 'women'}
        showCounter
      />
    </>
  )
})
