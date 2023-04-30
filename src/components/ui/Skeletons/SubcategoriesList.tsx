import React from 'react'

import {s} from 'react-native-size-matters'

import {BlockSkeleton} from './Block'

const emptyArr = Array(20).fill('')

export const SubcategoriesListSkeleton = () => {
  return (
    <>
      {emptyArr.map((_, id) => (
        <BlockSkeleton key={id} width={s(140)} height={s(140) + 24} />
      ))}
    </>
  )
}
