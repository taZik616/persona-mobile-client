import React, {useState} from 'react'

import {HomeAuth} from './HomeAuth'

import {Header} from '../ui/Header'

export type HomeProfileProps = {}

export const HomeProfile = ({}: HomeProfileProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    <>
      <Header hideSearch />
      {isAuthenticated ? <></> : <HomeAuth />}
    </>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
// })
