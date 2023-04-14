import {PayloadAction, createSlice} from '@reduxjs/toolkit'

interface GenderSliceState {
  isAuthenticated: boolean
}

const initialState: GenderSliceState = {
  isAuthenticated: false,
}

export const profileSlice = createSlice({
  name: 'gender',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
  },
})

export const {setIsAuthenticated} = profileSlice.actions
export const profileReducer = profileSlice.reducer
