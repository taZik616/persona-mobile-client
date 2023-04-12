import React from 'react'

import {Header} from '../ui/Header'

interface HomeFavouritesProps {}

export const HomeFavourites = ({}: HomeFavouritesProps) => {
  return (
    <>
      <Header title="Избранное" hideSearch subtitle="0 товаров" />
    </>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 12,
//   },
//   marginHorizontal: {
//     marginHorizontal: 20,
//   },
// })
