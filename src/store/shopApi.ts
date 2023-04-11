import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import {captureException} from 'src/helpers'
import {ProductPreviewInfo} from 'src/types'
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
      transformResponse: (data: any[]) =>
        data
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
                  previewImages:
                    'http://89.108.71.146:8000/IMGS_Preview/preview_2000000723044MAN055_1_.JPG_compressed.jpg;http://89.108.71.146:8000/IMGS_Preview/preview_2000000723044MAN054_1_.JPG_compressed.jpg;http://89.108.71.146:8000/IMGS_Preview/preview_2000000723044MAN113_1__compressed.jpg;http://89.108.71.146:8000/IMGS_Preview/preview_2000000723044MAN115_1__compressed.jpg;http://89.108.71.146:8000/IMGS_Preview/preview_2000000723044MAN116_1__compressed.jpg;http://89.108.71.146:8000/IMGS_Preview/preview_2000000723044MAN117_1__compressed.jpg;http://89.108.71.146:8000/IMGS_Preview/preview_2000000723099MAN051_1_.JPG_compressed.jpg;http://89.108.71.146:8000/IMGS_Preview/preview_2000000723099MAN052_1_.JPG_compressed.jpg;http://89.108.71.146:8000/IMGS_Preview/preview_bez_tsennikaMOD056_1_.JPG_compressed.jpg;http://89.108.71.146:8000/IMGS_Preview/preview_bez_tsennikaMOD053_1_.JPG_compressed.jpg;http://89.108.71.146:8000/IMGS_Preview/preview_bez_tsennikaMOD055_1_.JPG_compressed.jpg;http://89.108.71.146:8000/IMGS_Preview/preview_bez_tsennikaMOD050_1_.JPG_compressed.jpg'.split(
                      ';',
                    ), //previewImages.split(';'),
                  title: title === 'None' ? undefined : title,
                  largeImages: largeImages.split(';'),
                  brandImage: url === 'None' ? undefined : url,
                  collection: Collection === 'None' ? undefined : Collection,
                  brandName: brand,
                } as ProductPreviewInfo),
            )
          : [],
    }),
  }),
})

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
} = shopApi