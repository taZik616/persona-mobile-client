import {useEffect, useRef, useState} from 'react'

import {APP_API_URL} from '@env'
import axios from 'axios'

import {ProductsParams} from 'src/store/shopApi/types'
import {ProductsDataI} from 'src/types'

interface useProductsListParams extends ProductsParams {}

export const useProductsList = ({
  page = 0,
  ...params
}: useProductsListParams) => {
  const [curData, setCurData] = useState<ProductsDataI | undefined>(undefined)
  const pageNumberRef = useRef(page)

  const fetchProducts = async () => {
    const res = await axios.get(`${APP_API_URL}/api/v1/products`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
      params: {
        ...params,
        page_size: params.page_size || 50,
        page: pageNumberRef.current,
      },
    })

    const {data} = res
    if (data) {
      setCurData(pr => ({
        count: data.count,
        data: [...(pr?.data ?? []), ...(data?.data ?? [])],
      }))
    }
  }

  useEffect(() => {
    pageNumberRef.current = page
    setCurData(undefined)
    fetchProducts()
  }, [params, page])

  const loadNext = () => {
    if (
      pageNumberRef.current == null ||
      curData?.count == null ||
      pageNumberRef.current < curData?.count
    ) {
      pageNumberRef.current = pageNumberRef.current + 1
      fetchProducts()
    }
  }

  return {curData, loadNext}
}
