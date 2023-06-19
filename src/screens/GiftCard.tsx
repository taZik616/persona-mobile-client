import React, {useEffect, useRef} from 'react'

import {Linking} from 'react-native'

import {
  GiftCard,
  SelectNominal,
  SelectNominalRefType,
} from 'src/components/GiftCard'
import {useScreenBlockPortrait, useTypedNavigation} from 'src/hooks'
import {vibration} from 'src/services/vibration'
import {useGiftCardTypesQuery, useMintGiftCardMutation} from 'src/store/shopApi'
import {UNKNOWN_ERROR_MSG} from 'src/variables'

export const GiftCardScreen = () => {
  const selectNominalRef = useRef<SelectNominalRefType>(null)
  useScreenBlockPortrait()
  const onPressSelectNominal = () => {
    selectNominalRef.current?.open?.()
  }
  const cardTypeId = useRef(0)
  const cardTypes = useGiftCardTypesQuery({})
  const [mintGiftCard] = useMintGiftCardMutation()
  const {reset, navigate} = useTypedNavigation()

  useEffect(() => {
    if (cardTypes.currentData) {
      if ((selectNominalRef.current?.amountVariants.length ?? 0) <= 0) {
        selectNominalRef.current?.setAmountVariants(
          cardTypes.currentData[0].amountVariants,
        )
      }
    }
  }, [cardTypes.currentData])

  useEffect(() => {
    const sub = Linking.addEventListener('url', ({url}) => {
      if (url.split('://')[1].includes('gift-card-pay-success')) {
        reset({
          routes: [
            {
              name: 'home',
              params: {
                screen: 'homeProfile',
              },
            },
          ],
        })
        navigate('myGiftCards')
      }
    })
    return sub.remove
  }, [])

  const onContinue = async (amount: number) => {
    const response: any = await mintGiftCard({
      cardTypeId: cardTypes.currentData[cardTypeId.current].id,
      amount,
    })

    const error = response?.error?.data?.error || response?.data?.errorMessage
    const url = response?.data?.formUrl
    if (url) {
      vibration.success()
      selectNominalRef.current?.setRequestError('')
      Linking.openURL(url)
      selectNominalRef.current?.close?.()
    } else if (error && String(error).toLowerCase() !== 'success') {
      vibration.error()
      selectNominalRef.current?.setRequestError(error)
    } else {
      vibration.error()
      selectNominalRef.current?.setRequestError(UNKNOWN_ERROR_MSG)
    }
  }

  const onChangeCardType = (id: number) => {
    selectNominalRef.current?.setAmountVariants(
      cardTypes.currentData[id].amountVariants,
    )
    cardTypeId.current = id
  }

  return (
    <>
      <GiftCard
        onChangeCardType={onChangeCardType}
        onPressSelectNominal={onPressSelectNominal}
      />
      <SelectNominal onSubmit={onContinue} ref={selectNominalRef} />
    </>
  )
}
