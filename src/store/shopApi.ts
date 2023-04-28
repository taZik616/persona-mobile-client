import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import {captureException} from 'src/helpers'
import {ProductPreviewInfo, ProductsDataI, helpDetailKey} from 'src/types'
import {groupByAlphabetical} from 'src/variables/groupByAlphabetical'

const transformBrandsResponse = (data: any) => {
  try {
    return data
      ? groupByAlphabetical(data, 'Subdivision_Name', obj => ({
          id: obj.Subdivision_ID,
          name: obj.Subdivision_Name,
        }))
      : []
  } catch (error) {
    captureException(error)
    return []
  }
}

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://89.108.71.146:8000/',
  }),
  endpoints: build => ({
    getAllBrands: build.query({
      query: () => ({url: 'brands/', method: 'GET'}),
      transformResponse: transformBrandsResponse,
    }),
    getBrandsBySex: build.query({
      query: (sex: 'men' | 'women') => ({
        url: 'brands/',
        method: 'PATCH',
        body: {
          sex, // кекс
        },
      }),
      transformResponse: transformBrandsResponse,
    }),
    getTopBrands: build.query({
      query: (isMan: boolean) => ({
        url: 'topbrand/',
        method: 'PATCH',
        body: {
          Male: isMan ? 'True' : 'False',
          Female: !isMan ? 'True' : 'False',
        },
      }),
      transformResponse: (data: any) => data?.brand ?? [],
    }),
    /**
     * @param sortBy - пробел служит разделителем, здесь указываются названия полей
     * по которым должен происходить процесс фильтрации и одновременно сортировки
     * @example ```ts
     * "color Manufacturer" // сортировка и фильтрация по полям "color" и "Manufacturer"
     * ```
     * @param sortedValues - символ ≪;≫ служит разделителем между параметрами поля,
     * а символ ≪,≫ разделяет значения параметра
     * @example ```ts
     * "черный,зеленый;Италия" // поле "color" должно быть "черный" или "зеленый", "Manufacturer" - "Италия"
     * ```
     * @param filterByPrice
     * @param reverse
     *
     * @param start
     * @param end !! end - start <= 200 !!
     */
    getProducts: build.query({
      query: ({
        sortBy,
        sortedValues,
        filterByPrice = 'False',
        reverse,
        start = 0,
        end = 40,
        search,
      }: getProductsBody) => ({
        url: 'sort_by_lite/',
        method: 'PATCH',
        body: {
          sort_by: sortBy,
          key: sortedValues,
          Price: filterByPrice,
          reverse,
          'start count': start,
          'end count': end,
          Search: search,
        },
      }),
      transformResponse: (data: any): ProductsDataI | undefined => {
        return data
          ? {
              count: data.Count,
              data: data.Products.map(
                ({
                  Collection,
                  url,
                  brand,
                  previewImages,
                  title,
                  largeImages,
                  isAvailable,
                  ...item
                }: any) =>
                  ({
                    ...item,
                    previewImages: previewImages.split(';'),
                    isAvailable: isAvailable === '1',
                    title: title === 'None' ? undefined : title,
                    largeImages: largeImages.split(';'),
                    brandImage: url === 'None' ? undefined : url,
                    collection: Collection === 'None' ? undefined : Collection,
                    brandName: brand,
                  } as ProductPreviewInfo),
              ),
            }
          : undefined
      },
    }),
    getProductById: build.query({
      query: (id: string) => ({
        url: 'products/',
        method: 'PATCH',
        body: {
          IdProduct: id,
        },
      }),
      transformResponse: (data: any) =>
        data ? {description: data.Description} : [],
    }),
    createUserAndSendCode: build.mutation({
      query: ({telephone, firstName, lastName}: createUserAndSendCodeBody) => ({
        url: 'codesend/',
        method: 'PUT',
        body: {
          Phone: telephone,
          Surname: firstName,
          Name: lastName,
        },
      }),
    }),
    verifyUserCode: build.mutation({
      query: ({telephone, code}: verifyCodeBody) => ({
        url: 'codevalidate/',
        method: 'PUT',
        body: {
          Phone: telephone,
          PhoneCode: code,
        },
      }),
    }),
    login: build.mutation({
      query: ({username, password}: loginBody) => ({
        url: 'login/',
        method: 'POST',
        body: {
          Phone: username,
          password,
        },
      }),
    }),
    recoveryPasswordSendCode: build.mutation({
      query: ({telephone}: Omit<verifyCodeBody, 'code'>) => ({
        url: 'passwordrecoverysend/',
        method: 'PUT',
        body: {
          Phone: telephone,
        },
      }),
    }),
    recoveryPasswordVerifyCode: build.mutation({
      query: ({telephone, code}: verifyCodeBody) => ({
        url: 'passwordrecovery/',
        method: 'PUT',
        body: {
          Phone: telephone,
          PhoneCode: code,
        },
      }),
    }),
    changePassword: build.mutation({
      query: ({telephone, password}: changePasswordBody) => ({
        url: 'personality/',
        method: 'PUT',
        body: {
          Phone: telephone,
          password,
        },
      }),
    }),
    getHelpDetails: build.query({
      query: (type: helpDetailKey) => ({
        url: `${type}/`,
        method: 'GET',
      }),
      transformResponse: (data: any) => data ?? '',
    }),
    getMainContent: build.query({
      query: (gender: 'men' | 'women') => ({
        url: 'slider/',
        method: 'PATCH',
        body: {
          gender,
        },
      }),
    }),
    getCategories: build.query({
      query: ({gender, category = 'Main'}: getCategoriesBody) => ({
        url: 'categories/',
        method: 'PATCH',
        body: {
          gender,
          category,
        },
      }),
    }),
  }),
})

interface getCategoriesBody {
  gender?: 'men' | 'women'
  category?: 'Main' | string
}

interface changePasswordBody {
  telephone: string
  password: string
}
interface loginBody {
  username: string
  password: string
}
interface verifyCodeBody {
  telephone: string
  code: string
}
interface createUserAndSendCodeBody {
  telephone: string
  firstName?: string
  lastName?: string
}
interface getProductsBody {
  sortBy: string
  sortedValues: string
  start?: number
  end?: number
  filterByPrice?: 'True' | 'False'
  reverse?: 'True' | 'False'
  search?: string
}

export const {
  useGetAllBrandsQuery,
  useGetBrandsBySexQuery,
  useGetTopBrandsQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateUserAndSendCodeMutation,
  useVerifyUserCodeMutation,
  useGetHelpDetailsQuery,
  useLoginMutation,
  useRecoveryPasswordSendCodeMutation,
  useRecoveryPasswordVerifyCodeMutation,
  useChangePasswordMutation,
  useGetMainContentQuery,
  useGetCategoriesQuery,
} = shopApi
