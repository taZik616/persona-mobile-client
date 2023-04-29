import {useCallback, useEffect, useRef, useState} from 'react'

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

export const {
  useGetAllBrandsQuery,
  useGetBrandsBySexQuery,
  useGetTopBrandsQuery,
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

const ITEMS_PER_PAGE = 30
interface getProductsBody {
  sortBy?: string
  sortedValues?: string
  start?: number
  filterByPrice?: 'True' | 'False'
  reverse?: 'True' | 'False'
  search?: string
}

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
 *
 * Так вот, я все доки по RTK посмотрел, чат GPT просил(какие то не рабочии вообще решения
 * предложил), смотрел как все хуки там работают и понял что придется все-таки использовать
 * что-то отдельное от RTK в этом запросе если я хочу единожды вызывать где-то функцию и
 * получить результат.
 *
 * Единственное что могло мне помочь в теории это `useLazyQuery`, но он вызывает 3 лишних
 * ре-рендера,  которые не могу без отстойных костылей остановить(`useLazyQuery` не обладает
 * skip опцией как `useQuery`☹️)
 */
export const useProductsList = ({
  start = 0,
  sortBy = 'stock',
  sortedValues = '1',
  filterByPrice = 'False',
  reverse,
  search,
}: getProductsBody) => {
  const [curData, setCurData] = useState<ProductsDataI | undefined>(undefined)
  const countRef = useRef(start)

  const transformResponse = (data: any) =>
    data
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

  const fetchRes = useCallback(async () => {
    const res = await fetch('http://89.108.71.146:8000/sort_by_lite/', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sort_by: sortBy,
        key: sortedValues,
        Price: filterByPrice,
        reverse,
        'start count': countRef.current,
        'end count': countRef.current + ITEMS_PER_PAGE,
        Search: search,
      }),
    })
    const data = transformResponse(await res.json())
    if (data?.data) {
      setCurData(pr => ({
        count: data.count,
        data: [...(pr?.data ?? []), ...(data?.data ?? [])],
      }))
    }
  }, [])

  useEffect(() => {
    countRef.current = start
    setCurData(undefined)
    fetchRes()
  }, [sortBy, sortedValues, filterByPrice, reverse, search])

  const loadNext = () => {
    if (
      countRef.current == null ||
      curData?.count == null ||
      countRef.current < curData?.count
    ) {
      countRef.current = countRef.current + ITEMS_PER_PAGE
      fetchRes()
    }
  }

  return {curData, loadNext}
}
