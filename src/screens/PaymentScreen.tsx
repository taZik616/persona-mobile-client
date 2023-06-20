import React, {useCallback, useRef, useState} from 'react'

import {StyleSheet} from 'react-native'
import WebView from 'react-native-webview'

import {useTypedNavigation, useTypedRoute} from 'src/hooks'
import {store, useTypedDispatch} from 'src/store'
import {removeItemFromBasketByIds} from 'src/store/basketSlice'
import {useUpdateAndCheckOrderStatusMutation} from 'src/store/shopApi'
import {Color} from 'src/themes'

import {Header, Text} from 'ui/index'

export const PaymentScreen = () => {
  const {formUrl, orderFastBuyId} = useTypedRoute<'payment'>().params
  const [requestError, setRequestError] = useState('')
  const webviewRef = useRef<WebView>(null)

  const {navigate, popToTop} = useTypedNavigation()
  const dispatch = useTypedDispatch()
  const [updateStatus] = useUpdateAndCheckOrderStatusMutation()

  const handleWebViewNavigationStateChange = useCallback(
    ({url}: {url: string}) => {
      if (!url) return

      let path: string
      if (url.includes('?')) {
        path = url.split('://')[1].split('?')[0]
      } else {
        path = url.split('://')[1]
      }

      switch (path) {
        case 'order-pay-failed':
          webviewRef.current?.stopLoading()
          setRequestError('Оплата заказа не прошла')
          break
        case 'order-pay-success':
          webviewRef.current?.stopLoading()
          const {selectedItemIds} = store.getState().basket
          dispatch(removeItemFromBasketByIds(selectedItemIds))
          popToTop()
          navigate('home', {
            screen: 'homeProfile',
          })
          navigate('orders', {needUpdateStatuses: true})
          break
        case 'fast-order-pay-failed':
          webviewRef.current?.stopLoading()
          setRequestError('Оплата заказа не прошла')
          break
        case 'success-fast-payment':
          webviewRef.current?.stopLoading()
          setTimeout(() => orderFastBuyId && updateStatus(orderFastBuyId), 1000)
          navigate('home')
          break
        case 'gift-card-pay-success':
          webviewRef.current?.stopLoading()
          popToTop()
          navigate('home', {
            screen: 'homeProfile',
          })
          navigate('myGiftCards', {needUpdateStatuses: true})
          break
      }
    },

    [],
  )

  return (
    <>
      <Header showBack hideBasket hideSearch title="Оформление оплаты" />
      <WebView
        ref={webviewRef}
        style={styles.container}
        originWhitelist={['*']}
        source={{uri: formUrl}}
        onNavigationStateChange={handleWebViewNavigationStateChange}
      />
      {requestError && (
        <Text gp1 center color={Color.textRed1}>
          {requestError}
        </Text>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
