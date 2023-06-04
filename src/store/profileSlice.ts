import {APP_API_URL} from '@env'
import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import axios, {AxiosError} from 'axios'
import {getGenericPassword, resetGenericPassword} from 'react-native-keychain'

import {captureException} from 'src/helpers'
import {storePassword} from 'src/helpers/keychain'
import {UNKNOWN_ERROR_MSG} from 'src/variables'

import {loadItemsToBasket, setBasketItems} from './basketSlice'
import {loadItemsToFavorites, setFavoritesItems} from './favoritesSlice'

import {store} from '.'

interface initialStateType {
  isAuthenticated: boolean
  phoneNumber: string
  firstName: string
  lastName: string
  birthday?: string
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
  firstName: '',
  lastName: '',
  birthday: undefined,
  email: undefined,
  subSms: false,
  subPush: false,
  subEmail: false,
  allowAppNotification: false,
  authToken: undefined,
}
type UpdatableInfo = {
  firstName: string
  lastName: string
  birthday?: string
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
    setUserInfo: (state, action: PayloadAction<UpdatableInfo>) => {
      const data = action.payload

      state.firstName = data.firstName
      state.birthday = data.birthday
      state.email = data.email
      state.lastName = data.lastName
    },
    cleanUpUserInfo: state => {
      state.firstName = ''
      state.lastName = ''
      state.phoneNumber = ''
      state.birthday = undefined
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
  dispatch(setFavoritesItems([]))
  dispatch(setBasketItems([]))
  await resetGenericPassword()
}

export const getUserData = async (dispatch: any) => {
  const token = store.getState().profile.authToken
  dispatch(loadItemsToFavorites)
  dispatch(loadItemsToBasket)
  try {
    const req = await axios.get(`${APP_API_URL}/api/v1/personal-info`, {
      headers: {Authorization: token ? `Token ${token}` : ''},
    })
    if (req.data) {
      const {data} = req
      dispatch(
        setUserInfo({
          firstName: data.firstName,
          lastName: data.lastName,
          birthday: data.birthday,
          email: data.email,
        }),
      )
      dispatch(setPhoneNumber(data.phoneNumber))
    }
  } catch (error) {
    captureException(error)
  }
}

export const updateUserData =
  (newInfo: UpdatableInfo) => async (dispatch: any) => {
    try {
      const token = store.getState().profile.authToken
      await axios.put(
        `${APP_API_URL}/api/v1/personal-info`,
        {
          firstName: newInfo.firstName,
          lastName: newInfo.lastName,
          birthday: newInfo.birthday,
          email: newInfo.email,
        },
        {headers: {Authorization: token ? `Token ${token}` : ''}},
      )
      dispatch(setUserInfo(newInfo))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        const errorMessage = (axiosError.response?.data as any)?.error
        console.log('🚀 - errorMessage:', errorMessage)
      } else {
        captureException(error)
      }
    }
  }

export const updateUserPassword = async (
  password: string,
  newPassword: string,
) => {
  try {
    const token = store.getState().profile.authToken
    const req = await axios.post(
      `${APP_API_URL}/api/v1/change-password`,
      {password, newPassword},
      {headers: {Authorization: token ? `Token ${token}` : ''}},
    )

    if (req.data.success) {
      const prevCreds = await getGenericPassword()
      if (prevCreds)
        storePassword({user: prevCreds.username, password: newPassword})
    } else {
      return UNKNOWN_ERROR_MSG
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      const errorMessage = (axiosError.response?.data as any)?.error
      if (errorMessage) {
        return errorMessage
      } else {
        return UNKNOWN_ERROR_MSG
      }
    } else {
      captureException(error)
      return UNKNOWN_ERROR_MSG
    }
  }
}

export const setSubSms = (enabled: boolean) => async (dispatch: any) => {
  dispatch(profileSlice.actions.setSubSms(enabled))
  const token = store.getState().profile.authToken
  await axios.put(
    `${APP_API_URL}/api/v1/personal-info`,
    {subSms: enabled ? 'True' : 'False'},
    {headers: {Authorization: token ? `Token ${token}` : ''}},
  )
}

export const setSubEmail = (enabled: boolean) => async (dispatch: any) => {
  dispatch(profileSlice.actions.setSubEmail(enabled))
  const token = store.getState().profile.authToken
  await axios.put(
    `${APP_API_URL}/api/v1/personal-info`,
    {subEmail: enabled ? 'True' : 'False'},
    {headers: {Authorization: token ? `Token ${token}` : ''}},
  )
}

export const setSubPush = (enabled: boolean) => async (dispatch: any) => {
  dispatch(profileSlice.actions.setSubPush(enabled))
  const token = store.getState().profile.authToken
  await axios.put(
    `${APP_API_URL}/api/v1/personal-info`,
    {subPush: enabled ? 'True' : 'False'},
    {headers: {Authorization: token ? `Token ${token}` : ''}},
  )
}

export const {
  setIsAuthenticated,
  setUserInfo,
  setPhoneNumber,
  cleanUpUserInfo,
  setAllowAppNotification,
  setAuthToken,
} = profileSlice.actions

export const profileReducer = profileSlice.reducer
