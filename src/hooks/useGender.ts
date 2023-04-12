import {useCallback} from 'react'

import {selectGender, useTypedDispatch, useTypedSelector} from 'src/store'
import {toggleGender} from 'src/store/genderSlice'

const values: [string, string] = ['женское', 'мужское']

export function useGender() {
  const gender = useTypedSelector(selectGender)
  const dispatch = useTypedDispatch()
  const isMenSelected = gender === 'men'

  const onChangeGender = useCallback(
    (str: string) =>
      dispatch(toggleGender(str === 'женское' ? 'women' : 'men')),
    [],
  )

  return {onChangeGender, isMenSelected, values}
}
