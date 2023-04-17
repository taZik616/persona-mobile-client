import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import {captureException} from 'src/helpers'
import {ProductPreviewInfo, helpDetailKey} from 'src/types'
import {groupByAlphabetical} from 'src/variables/groupByAlphabetical'

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://89.108.71.146:8000/',
  }),
  endpoints: build => ({
    getAllBrands: build.query({
      query: () => 'brands',
    }),
    getBrandsBySex: build.query({
      query: (sex: 'men' | 'women') => ({
        url: 'brands/',
        method: 'PATCH',
        body: {
          sex, // кекс
        },
      }),
      transformResponse: (data: any) => {
        try {
          return data
            ? groupByAlphabetical(data, 'Subdivision_Name', obj => ({
                ...obj,
                id: obj.Subdivision_ID,
                name: obj.Subdivision_Name,
              }))
            : []
        } catch (error) {
          captureException(error)
          return []
        }
      },
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
      transformResponse: (data: any[]) => {
        return data
          ? data.map(
              ({
                Collection,
                url,
                brand,
                previewImages,
                title,
                largeImages,
                ...item
              }) =>
                ({
                  ...item,
                  previewImages: previewImages.split(';'),
                  // 'http://89.108.71.146:8000/IMGS_Preview/preview_2000000723044MAN055_1_.JPG_compressed.jpg;http://89.108.71.146:8000/IMGS_Preview/preview_2000000723044MAN054_1_.JPG_compressed.jpg;http://89.108.71.146:8000/IMGS_Preview/preview_2000000723044MAN113_1__compressed.jpg;http://89.108.71.146:8000/IMGS_Preview/preview_2000000723044MAN115_1__compressed.jpg;http://89.108.71.146:8000/IMGS_Preview/preview_2000000723044MAN116_1__compressed.jpg;http://89.108.71.146:8000/IMGS_Preview/preview_2000000723044MAN117_1__compressed.jpg;http://89.108.71.146:8000/IMGS_Preview/preview_2000000723099MAN051_1_.JPG_compressed.jpg;http://89.108.71.146:8000/IMGS_Preview/preview_2000000723099MAN052_1_.JPG_compressed.jpg;http://89.108.71.146:8000/IMGS_Preview/preview_bez_tsennikaMOD056_1_.JPG_compressed.jpg;http://89.108.71.146:8000/IMGS_Preview/preview_bez_tsennikaMOD053_1_.JPG_compressed.jpg;http://89.108.71.146:8000/IMGS_Preview/preview_bez_tsennikaMOD055_1_.JPG_compressed.jpg;http://89.108.71.146:8000/IMGS_Preview/preview_bez_tsennikaMOD050_1_.JPG_compressed.jpg'.split(
                  //   ';',
                  //  ),
                  title: title === 'None' ? undefined : title,
                  largeImages: largeImages.split(';'),
                  brandImage: url === 'None' ? undefined : url,
                  collection: Collection === 'None' ? undefined : Collection,
                  brandName: brand,
                } as ProductPreviewInfo),
            )
          : []
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
      transformResponse: (data: any) => data ?? [],
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
      query: ({telephone, code}: verifyUserCodeBody) => ({
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
    getHelpDetails: build.query({
      query: (type: helpDetailKey) => ({
        url: `${type}/`,
        method: 'GET',
      }),
      transformResponse: (data: any) => data ?? '',
    }),
  }),
})

interface loginBody {
  username: string
  password: string
}
interface verifyUserCodeBody {
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
} = shopApi
