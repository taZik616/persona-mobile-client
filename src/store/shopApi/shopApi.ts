import {APP_API_URL} from '@env'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import {StoreStateType} from 'src/store'
import {helpfulInfoKey} from 'src/types'

import {
  CategoriesBody,
  ChangePasswordBody,
  CreateUserAndSendCodeBody,
  GetBrandsBody,
  LoginBody,
  RecoveryPasswordConfirmBody,
  RecoveryPasswordSendCodeBody,
} from './types'

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${APP_API_URL}/api/v1/`,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as StoreStateType).profile.authToken ?? ''
      headers.set('Authorization', `Token ${token}`)
      return headers
    },
  }),
  endpoints: build => ({
    brands: build.query({
      query: (body: GetBrandsBody) => ({
        url: 'brands',
        method: 'PATCH',
        body,
      }),
    }),
    productDetail: build.query({
      query: (productId: string) => ({
        url: `products/${productId}`,
        method: 'GET',
      }),
    }),
    createUserAndSendCode: build.mutation({
      query: (body: CreateUserAndSendCodeBody) => ({
        url: 'registry-send-code',
        method: 'PUT',
        body,
      }),
    }),
    login: build.mutation({
      query: (body: LoginBody) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
    recoveryPasswordSendCode: build.mutation({
      query: (body: RecoveryPasswordSendCodeBody) => ({
        url: 'recovery-password-send',
        method: 'POST',
        body,
      }),
    }),
    recoveryPasswordConfirm: build.mutation({
      query: (body: RecoveryPasswordConfirmBody) => ({
        url: 'recovery-password-confirm/',
        method: 'PUT',
        body,
      }),
    }),
    changePassword: build.mutation({
      query: (body: ChangePasswordBody) => ({
        url: 'personality/',
        method: 'PUT',
        body,
      }),
    }),
    helpfulInfo: build.query({
      query: (infoName: helpfulInfoKey) => ({
        url: `info/${infoName}`,
        method: 'GET',
      }),
    }),
    mainContent: build.query({
      query: (gender: 'men' | 'women') => ({
        url: 'main-content',
        method: 'GET',
        body: {gender},
      }),
    }),
    categories: build.query({
      query: (body: CategoriesBody) => ({
        url: 'categories/',
        method: 'PATCH',
        body,
      }),
    }),
    // loyaltyCodeSend: build.mutation({
    //   query: ({userPhone}: Omit<LoyaltyCodeValidateBody, 'code'>) => ({
    //     url: 'loyaltycard/',
    //     method: 'POST',
    //     body: {
    //       UserPhone: userPhone, // Тут по номеру карты должно быть и данные о юззере беруться по токену
    //     },
    //   }),
    // }),
    // loyaltyCodeValidate: build.mutation({
    //   query: ({userPhone, code}: LoyaltyCodeValidateBody) => ({
    //     url: 'loyaltycardvalidate/',
    //     method: 'PUT',
    //     body: {
    //       UserPhone: userPhone,
    //       code,
    //     },
    //   }),
    // }),

    // getOrders: build.query({
    //   query: () => ({
    //     url: 'order/',
    //     method: 'PATCH',
    //   }),
    // }),
  }),
})

export const {
  useBrandsQuery,
  useCategoriesQuery,
  useHelpfulInfoQuery,
  useMainContentQuery,
  useProductDetailQuery,
  useRecoveryPasswordConfirmMutation,
  useLoginMutation,
  useRecoveryPasswordSendCodeMutation,
  useChangePasswordMutation,
} = shopApi
