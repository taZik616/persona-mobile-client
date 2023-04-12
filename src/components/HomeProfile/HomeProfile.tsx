import React from 'react'

import {Header} from '../ui/Header'
import {Spacer} from '../ui/Spacer'

export type HomeProfileProps = {}

export const HomeProfile = ({}: HomeProfileProps) => {
  return (
    <>
      <Header hideSearch />
      <Spacer height={20} />
    </>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
// })
