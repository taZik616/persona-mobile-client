import {useEffect, useState} from 'react'

/**
 * `console.log('🔔 - rerender COMPONENT')`
 */
export const useRerendersCheck = () => {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    setInterval(() => {
      setCounter(pr => pr + 1)
    }, 1000)
  }, [])

  console.log('🚀 - rerender count:', counter)
}
