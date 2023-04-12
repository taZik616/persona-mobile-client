import AsyncStorage from '@react-native-async-storage/async-storage'
import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'

interface GenderSliceState {
  gender: 'men' | 'women'
}

const initialState: GenderSliceState = {
  gender: 'men',
}

export const genderSlice = createSlice({
  name: 'gender',
  initialState,
  reducers: {
    toggleGender: (state, action: PayloadAction<'men' | 'women'>) => {
      const gender = action.payload
      state.gender = gender
    },
  },
})

export const {toggleGender} = genderSlice.actions

export const genderReducer = genderSlice.reducer

const genderPersistConfig = {
  key: 'gender',
  version: 1,
  storage: AsyncStorage,
}

export const persistedGenderReducer = persistReducer(
  genderPersistConfig,
  genderReducer,
)
