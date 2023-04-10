import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import {captureException} from 'src/helpers'
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
  }),
})

export const {
  useGetAllBrandsQuery,
  useGetBrandsBySexQuery,
  useGetTopBrandsQuery,
} = shopApi
