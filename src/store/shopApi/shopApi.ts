import {APP_API_URL} from '@env'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import {StoreStateType} from 'src/store'
import {helpfulInfoKey} from 'src/types'

import {
  CategoriesParams,
  ChangePasswordBody,
  CreateUserAndSendCodeBody,
  GetBrandsBody,
  LoginBody,
  MightBeInterestedParams,
  RecoveryPasswordCheckBody,
  RecoveryPasswordCompleteBody,
  RecoveryPasswordSendCodeBody,
  ResendRegistryCodeBody,
} from './types'

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${APP_API_URL}/api/v1/`,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as StoreStateType).profile.authToken ?? ''
      token && headers.set('Authorization', `Token ${token}`)
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
    sizeChart: build.query({
      query: () => ({
        url: 'sizes-page',
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
    resendRegistryCode: build.mutation({
      query: (body: ResendRegistryCodeBody) => ({
        url: 'registry-resend-code',
        method: 'POST',
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
    recoveryPasswordCheck: build.mutation({
      query: (body: RecoveryPasswordCheckBody) => ({
        url: 'recovery-password-check',
        method: 'POST',
        body,
      }),
    }),
    recoveryPasswordComplete: build.mutation({
      query: (body: RecoveryPasswordCompleteBody) => ({
        url: 'recovery-password-complete',
        method: 'POST',
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
        params: {gender},
      }),
    }),
    categories: build.query({
      query: (params: CategoriesParams) => ({
        url: 'categories',
        method: 'GET',
        params,
      }),
    }),
    mightBeInterested: build.query({
      query: (params: MightBeInterestedParams) => ({
        url: 'might-be-interested',
        method: 'GET',
        params,
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
  useSizeChartQuery,
  useProductDetailQuery,
  useMightBeInterestedQuery,
  useRecoveryPasswordCheckMutation,
  useRecoveryPasswordCompleteMutation,
  useLoginMutation,
  useRecoveryPasswordSendCodeMutation,
  useChangePasswordMutation,
  useCreateUserAndSendCodeMutation,
  useResendRegistryCodeMutation,
} = shopApi
