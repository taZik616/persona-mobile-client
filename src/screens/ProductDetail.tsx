import React, {useCallback, useEffect, useRef} from 'react'

import {
  AddedToBasket,
  AddedToBasketRefType,
  ProductDetail,
  ProductVariantSelector,
  ProductVariantSelectorRefType,
} from 'components/ProductDetail'

import {useTypedNavigation, useTypedRoute} from 'src/hooks'
import {useTypedDispatch} from 'src/store'
import {addItemToBasket} from 'src/store/basketSlice'
import {addItemToRecently} from 'src/store/recentlyWatchedSlice'
import {useProductDetailQuery} from 'src/store/shopApi'
import {ProductDetailInfo, ProductPreviewInfo, ProductVariant} from 'src/types'

import {ProductDetailSkeleton} from 'ui/Skeletons/ProductDetail'

export const ProductDetailScreen = () => {
  const addedToBasketRef = useRef<AddedToBasketRefType>(null)
  const variantSelectorRef = useRef<ProductVariantSelectorRefType>(null)
  const isFastBuy = useRef<boolean>(false)

  const {product, productId} = useTypedRoute<'productDetail'>().params ?? {}
  const {goBack, navigate} = useTypedNavigation()

  const dispatch = useTypedDispatch()

  const onPressGoBasket = useCallback(() => {
    addedToBasketRef.current?.close?.()
    setTimeout(() => navigate('basket'), 250)
  }, [navigate])

  const onPressContinue = useCallback(() => {
    addedToBasketRef.current?.close?.()
    setTimeout(goBack, 250)
  }, [])

  const onPressAddToBasket = useCallback(() => {
    isFastBuy.current = false
    variantSelectorRef.current?.open?.()
  }, [])

  const onPressFastBuy = useCallback(() => {
    isFastBuy.current = true
    variantSelectorRef.current?.open?.()
  }, [])

  const productDetail = useProductDetailQuery(productId)
  const detailData: ProductDetailInfo | undefined = productDetail.currentData

  const productData = (
    detailData ? detailData : product
  ) as ProductPreviewInfo & Partial<ProductDetailInfo>

  useEffect(() => {
    detailData && dispatch(addItemToRecently(productData))
  }, [detailData])

  const onSelectionComplete = useCallback((variant: ProductVariant) => {
    variantSelectorRef.current?.close?.()
    if (!isFastBuy.current) {
      dispatch(addItemToBasket({...productData, variant: variant}))
      setTimeout(() => addedToBasketRef.current?.open?.(), 250)
    } else {
      setTimeout(() => {
        navigate('fastBuy', {product: {...productData, variant: variant}})
      }, 250)
    }
  }, [])

  if (
    (!product?.productId && productDetail.isLoading) ||
    (!product?.productId && productDetail.isError)
  )
    return (
      <ProductDetailSkeleton
        onRetry={productDetail.refetch}
        hasError={productDetail.isError}
      />
    )
  return (
    <>
      <ProductDetail
        onPressFastBuy={onPressFastBuy}
        onPressAddToBasket={onPressAddToBasket}
        {...productData}
      />
      {detailData && (
        <>
          <ProductVariantSelector
            variants={detailData.variants}
            onSelectionComplete={onSelectionComplete}
            ref={variantSelectorRef}
          />
          <AddedToBasket
            onPressContinue={onPressContinue}
            onPressGoBasket={onPressGoBasket}
            ref={addedToBasketRef}
          />
        </>
      )}
    </>
  )
}
