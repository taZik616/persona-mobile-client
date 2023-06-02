import {useCallback, useEffect, useRef, useState} from 'react'

import {APP_API_URL} from '@env'
import axios from 'axios'

import {captureException} from 'src/helpers'
import {ProductsParams} from 'src/store/shopApi/types'
import {ProductsDataI} from 'src/types'

interface useProductsListParams extends ProductsParams {}

// Я не просто так `...params` не использую, будет бесконечный цикл в useEffect,
// тк объекты сравниваются по ссылке, а ссылка будет меняться при любом ре-рендере
export const useProductsList = ({
  page = 1,
  brandIds,
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
  const [products, setProducts] = useState<ProductsDataI | undefined>(undefined)
  const [isLoad, setIsLoad] = useState(true)
  const pageNumberRef = useRef(page)

  const fetchProducts = async () => {
    try {
      setIsLoad(true)
      const res = await axios.get(`${APP_API_URL}/api/v1/products`, {
        method: 'GET',
        params: {
          brandIds,
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
        setProducts(pr => ({
          count: data.count,
          products: [...(pr?.products ?? []), ...(data?.products ?? [])],
          filters: data.filters,
        }))
      }
    } catch (e) {
      captureException(e)
    }
    setIsLoad(false)
  }

  useEffect(() => {
    pageNumberRef.current = page
    setProducts(undefined)
    fetchProducts()
  }, [
    brandIds,
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

  const reset = useCallback(() => {
    pageNumberRef.current = page
    setProducts(undefined)
    fetchProducts()
  }, [])

  const loadNext = useCallback(() => {
    pageNumberRef.current = pageNumberRef.current + 1
    fetchProducts()
  }, [])

  return {products, loadNext, reset, isLoad}
}
