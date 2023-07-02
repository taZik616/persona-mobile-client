import AsyncStorage from '@react-native-async-storage/async-storage'
import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'

import {StoreStateType, useTypedSelector} from '.'

interface HintSliceState {
  closed: string[]
}

const initialState: HintSliceState = {
  closed: [],
}

export const hintSlice = createSlice({
  name: 'hint',
  initialState,
  reducers: {
    closeHint: (state, action: PayloadAction<string>) => {
      const hintId = action.payload
      state.closed = [...state.closed, hintId]
    },
  },
})

const selectClosedHints = (state: StoreStateType) => state.hint.closed
export const useIsHintClosed = (hintId: string) => {
  const closed = useTypedSelector(selectClosedHints)
  return closed.includes(hintId)
}

export const {closeHint} = hintSlice.actions

export const hintReducer = hintSlice.reducer

const hintPersistConfig = {
  key: 'hint',
  version: 1,
  storage: AsyncStorage,
}

export const persistedHintReducer = persistReducer(
  hintPersistConfig,
  hintReducer,
)
