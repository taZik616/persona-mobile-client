import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

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
      query: (sex: 'man' | 'women') => ({
        url: 'brands',
        method: 'PATCH',
        body: {
          sex, // кекс
        },
      }),
    }),
  }),
})

export const {useGetAllBrandsQuery, useGetBrandsBySexQuery} = shopApi
