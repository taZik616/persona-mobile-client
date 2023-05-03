import {APP_API_URL} from '@env'
import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import {getGenericPassword, resetGenericPassword} from 'react-native-keychain'

import {captureException} from 'src/helpers'
import {storePassword} from 'src/helpers/keychain'
import {UNKNOWN_ERROR_MSG} from 'src/variables'

import {loadItemsToBasket, setBasketItems} from './basketSlice'
import {loadItemsToFavorites} from './favoritesSlice'

import {StoreStateType, store} from '.'

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
  allowAppNotification: boolean
  authToken: string | undefined
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
  allowAppNotification: false,
  authToken: undefined,
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
      state.authToken = undefined
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
    setAllowAppNotification: (state, action: PayloadAction<boolean>) => {
      if (state.allowAppNotification !== action.payload)
        state.allowAppNotification = action.payload
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      const token = action.payload
      if (state.authToken !== token) state.authToken = token
    },
  },
})

export const whenExitHandler = async (dispatch: any) => {
  dispatch(setIsAuthenticated(false))
  dispatch(cleanUpUserInfo())
  dispatch(setBasketItems([]))
  await resetGenericPassword()
}

export const getUserData = async (
  dispatch: any,
  getState: () => StoreStateType,
) => {
  dispatch(loadItemsToFavorites)
  dispatch(loadItemsToBasket)
  const req = await fetch(`${APP_API_URL}/getpersonal/`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: getState().profile.authToken ?? '',
    },
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
    dispatch(setPhoneNumber(data.Phone))
  }
}

export const updateUserData =
  (newInfo: updatableInfo) =>
  async (dispatch: any, getState: () => StoreStateType) => {
    const req = await fetch(`${APP_API_URL}/personality/`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: getState().profile.authToken ?? '',
      },
      body: JSON.stringify({
        Surname: newInfo.surname,
        Name: newInfo.name,
        Date_of_birth: newInfo.dob,
        email: newInfo.email,
      }),
    })

    if (req.ok) {
      dispatch(setUserInfo(newInfo))
    }
  }

export const updateUserPassword = async (curPass: string, newPass: string) => {
  try {
    const req = await fetch(`${APP_API_URL}/personality/`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: store.getState().profile.authToken ?? '',
      },
      body: JSON.stringify({
        password: curPass,
        new_password: newPass,
      }),
    })

    if (req.ok) {
      const prevCreds = await getGenericPassword()
      if (prevCreds)
        storePassword({user: prevCreds.username, password: newPass})
    }
    const res = await req.json()
    if (res.success) {
      return
    } else {
      return res?.failed || UNKNOWN_ERROR_MSG
    }
  } catch (error) {
    captureException(error)
    return UNKNOWN_ERROR_MSG
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
  setAllowAppNotification,
  setAuthToken,
} = profileSlice.actions
export const profileReducer = profileSlice.reducer
