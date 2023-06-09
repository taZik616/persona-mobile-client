import {APP_API_URL} from '@env'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import {StoreStateType} from 'src/store'
import {helpfulInfoKey} from 'src/types'

import {
  CategoriesParams,
  ChangePasswordBody,
  CreateFastOrderBody,
  CreateOrderBody,
  CreateUserAndSendCodeBody,
  GetBrandsBody,
  LoginBody,
  MightBeInterestedParams,
  MintGiftCardBody,
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
    deliveryPrice: build.query({
      query: (orderPrice?: number) => ({
        url: 'delivery-price',
        method: 'GET',
        params: {orderPrice},
      }),
    }),
    myOrders: build.query({
      query: () => ({
        url: 'my-orders',
        method: 'GET',
      }),
      transformResponse(orders: any) {
        return orders?.map((order: any) => ({
          ...order,
          productsInfo: order.productsInfo.map(({product, ...other}: any) => ({
            ...product,
            ...other,
          })),
        }))
      },
    }),
    myGiftedCards: build.query({
      query: () => ({
        url: 'own-minted-gift-cards',
        method: 'GET',
      }),
    }),
    giftCardTypes: build.query({
      query: () => ({
        url: 'gift-card-types',
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
    updateMyGiftCardStatuses: build.mutation({
      query: () => ({
        url: 'update-my-gift-card-statuses',
        method: 'POST',
      }),
    }),
    mintGiftCard: build.mutation({
      query: (body: MintGiftCardBody) => ({
        url: 'mint-gift-card',
        method: 'POST',
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
    createOrder: build.mutation({
      query: (body: CreateOrderBody) => ({
        url: 'create-order',
        method: 'POST',
        body,
      }),
    }),
    createFastOrder: build.mutation({
      query: (body: CreateFastOrderBody) => ({
        url: 'create-fast-order',
        method: 'POST',
        body,
      }),
    }),
    updateMyOrderStatuses: build.mutation({
      query: () => ({
        url: 'update-all-order-statuses',
        method: 'POST',
      }),
    }),
    updateAndCheckOrderStatus: build.mutation({
      query: (orderId: string) => ({
        url: 'check-order-status',
        method: 'POST',
        body: {orderId},
      }),
    }),
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
  useDeliveryPriceQuery,
  useMyOrdersQuery,
  useMyGiftedCardsQuery,
  useGiftCardTypesQuery,
  useUpdateMyGiftCardStatusesMutation,
  useMintGiftCardMutation,
  useRecoveryPasswordCheckMutation,
  useRecoveryPasswordCompleteMutation,
  useLoginMutation,
  useRecoveryPasswordSendCodeMutation,
  useChangePasswordMutation,
  useCreateUserAndSendCodeMutation,
  useResendRegistryCodeMutation,
  useCreateOrderMutation,
  useCreateFastOrderMutation,
  useUpdateMyOrderStatusesMutation,
  useUpdateAndCheckOrderStatusMutation,
} = shopApi
