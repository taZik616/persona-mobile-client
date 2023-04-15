import {PayloadAction, createSlice} from '@reduxjs/toolkit'

interface initialStateType {
  isAuthenticated: boolean
}

const initialState: initialStateType = {
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
