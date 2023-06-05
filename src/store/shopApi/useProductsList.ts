import {useEffect, useRef, useState} from 'react'

import {APP_API_URL} from '@env'
import axios from 'axios'

import {captureException} from 'src/helpers'
import {ProductsParams} from 'src/store/shopApi/types'
import {ProductsDataI} from 'src/types'

interface useProductsListParams extends ProductsParams {}

// Я не просто так `...params` не использую, будет бесконечный цикл в useEffect,
// тк объекты сравниваются по ссылке, а ссылка будет меняться при любом ре-рендере
export const useProductsList = ({
  page = 0,
  brandIds,
  productId,
  page_size = 30,
  ordering,
  subcategoryId,
  categoryId,
  priceGroup,
  search,
  isNew,
  gender,
  sizes,
}: useProductsListParams) => {
  const [products, setProducts] = useState<ProductsDataI | undefined>(undefined)
  const [isLoad, setIsLoad] = useState(false)
  const pageNumberRef = useRef(page)
  const maxPageRef = useRef(1)

  const loadNext = () => {
    if (isLoad) return
    if (maxPageRef.current <= pageNumberRef.current) return

    pageNumberRef.current = pageNumberRef.current + 1
    setIsLoad(true)

    const fetchProducts = async () => {
      try {
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
            sizes,
          },
        })
        const {data} = res

        if (data) {
          setProducts(pr => ({
            count: data.count,
            products: [...(pr?.products ?? []), ...(data?.products ?? [])],
            filters: data.filters,
          }))
          maxPageRef.current = Math.ceil(data.count / page_size)
        }
      } catch (e) {
        captureException(e)
      }
      setIsLoad(false)
    }
    fetchProducts()
  }

  useEffect(() => {
    pageNumberRef.current = page
    setProducts(undefined)
    loadNext()
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
    sizes,
  ])

  return {products, loadNext, isLoad}
}
