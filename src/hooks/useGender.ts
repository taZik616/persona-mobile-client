import {useCallback, useState} from 'react'

const values: [string, string] = ['женское', 'мужское']

export function useGender() {
  const [isMenSelected, setIsMenSelected] = useState(false)

  const onChangeGender = useCallback(
    (str: string) => setIsMenSelected(str === 'мужское'),
    [],
  )

  return {onChangeGender, isMenSelected, values}
}
