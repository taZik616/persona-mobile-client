import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import {resetGenericPassword} from 'react-native-keychain'

interface initialStateType {
  isAuthenticated: boolean
  phoneNumber: string
  name: string
  surname: string
  dob?: string
  email?: string
  subSms: boolean
  subPush: boolean
  subEmail: boolean
}

const initialState: initialStateType = {
  isAuthenticated: false,
  phoneNumber: '',
  name: '',
  surname: '',
  dob: '',
  email: '',
  subSms: false,
  subPush: false,
  subEmail: false,
}
type updatableInfo = {
  name: string
  surname: string
  dob?: string
  email?: string
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload
    },
    setUserInfo: (state, action: PayloadAction<updatableInfo>) => {
      const data = action.payload

      state.dob = data.dob
      state.email = data.email
      state.name = data.name
      state.surname = data.surname
    },
    cleanUpUserInfo: state => {
      state.name = ''
      state.surname = ''
      state.phoneNumber = ''
      state.dob = undefined
      state.email = undefined
    },
    setSubSms: (state, action: PayloadAction<boolean>) => {
      state.subSms = action.payload
    },
    setSubPush: (state, action: PayloadAction<boolean>) => {
      state.subPush = action.payload
    },
    setSubEmail: (state, action: PayloadAction<boolean>) => {
      state.subEmail = action.payload
    },
  },
})

export const cleanUserDataAndKeychain = async (dispatch: any) => {
  await resetGenericPassword()
  dispatch(cleanUpUserInfo())
}

export const getUserData = (phoneNumber: string) => async (dispatch: any) => {
  // dispatch(
  //   setUserInfo({
  //     dob: '2021-04-18T02:07:17.000Z',
  //     email: 'vadim.prssoloff@gmail.com',
  //     name: 'User',
  //     surname: 'Super',
  //   }),
  // )
  // dispatch(setPhoneNumber(phoneNumber))
  const req = await fetch('http://89.108.71.146:8000/getpersonal/', {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Phone: phoneNumber,
    }),
  })
  const data = await req.json()

  if (req.ok) {
    dispatch(
      setUserInfo({
        name: data.Name,
        surname: data.Surname,
        dob: data.Date_of_birth,
        email: data.email,
      }),
    )
    dispatch(setPhoneNumber(phoneNumber))
  }
}

export const updateUserData =
  (newInfo: updatableInfo) => async (dispatch: any) => {
    const req = await fetch('http://89.108.71.146:8000/personality/', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Surname: newInfo.surname,
        Name: newInfo.name,
        Date_of_birth: newInfo.dob,
        email: newInfo.email,
      }),
    })
    const data = await req.json()
    console.log('🚀 - data:', data)

    if (req.ok) {
      dispatch(setUserInfo(newInfo))
    }
  }

export const {
  setIsAuthenticated,
  setUserInfo,
  setPhoneNumber,
  cleanUpUserInfo,
  setSubSms,
  setSubEmail,
  setSubPush,
} = profileSlice.actions
export const profileReducer = profileSlice.reducer
