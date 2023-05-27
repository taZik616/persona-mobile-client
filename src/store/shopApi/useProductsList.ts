import {useEffect, useRef, useState} from 'react'

import {APP_API_URL} from '@env'
import axios from 'axios'

import {ProductsParams} from 'src/store/shopApi/types'
import {ProductsDataI} from 'src/types'

interface useProductsListParams extends ProductsParams {}

// Я не просто так `...params` не использую, будет бесконечный цикл в useEffect,
// тк объекты сравниваются по ссылке, а ссылка будет меняться при любом ре-рендере
export const useProductsList = ({
  page = 1,
  brand__brandId,
  productId,
  page_size = 50,
  ordering,
  subcategoryId,
  categoryId,
  priceGroup,
  search,
  isNew,
  gender,
}: useProductsListParams) => {
  const [curData, setCurData] = useState<ProductsDataI | undefined>(undefined)
  const pageNumberRef = useRef(page)

  const fetchProducts = async () => {
    const res = await axios.get(`${APP_API_URL}/api/v1/products`, {
      method: 'GET',
      params: {
        brand__brandId,
        productId,
        page_size,
        ordering,
        subcategoryId,
        categoryId,
        priceGroup,
        search,
        isNew,
        gender,
        page: pageNumberRef.current,
      },
    })

    const {data} = res
    if (data) {
      setCurData(pr => ({
        count: data.count,
        products: [...(pr?.products ?? []), ...(data?.products ?? [])],
      }))
    }
  }

  useEffect(() => {
    pageNumberRef.current = page
    setCurData(undefined)
    fetchProducts()
  }, [
    brand__brandId,
    productId,
    page_size,
    ordering,
    subcategoryId,
    categoryId,
    priceGroup,
    search,
    isNew,
    gender,
    page,
  ])

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
