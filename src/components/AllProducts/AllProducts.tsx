import React, {memo, useState} from 'react'

import {useTypedRoute} from 'src/hooks'
import {useGender} from 'src/hooks/useGender'

import {Header} from '../ui/Header'
import {RenderProductList} from '../ui/RenderProductList'
import {SelectorTwoOptions} from '../ui/SelectorTwoOptions'
import {Spacer} from '../ui/Spacer'

export const AllProducts = memo(() => {
  const {isMenSelected, onChangeGender, values} = useGender()
  const {brandIds, search, showGenderSelect, categoryId} =
    useTypedRoute<'allProducts'>().params

  const [searchingText, setSearchingText] = useState<string | undefined>(search)

  return (
    <>
      <Header onSearchSubmit={setSearchingText} showBack />
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
      <RenderProductList
        sortBy={`stock ${categoryId ? 'Subdivision_ID' : ''}`} // Brand
        sortedValues={`1${categoryId ? `;${categoryId}` : ''}`} // brandIds?.join(',')
        showCounter
        search={searchingText}
      />
    </>
  )
})
