import React, {useEffect, useRef} from 'react'

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
  const [mintGiftCard, {isLoading}] = useMintGiftCardMutation()
  const {navigate} = useTypedNavigation()

  useEffect(() => {
    if (cardTypes.currentData) {
      if ((selectNominalRef.current?.amountVariants.length ?? 0) <= 0) {
        selectNominalRef.current?.setAmountVariants(
          cardTypes.currentData[0].amountVariants,
        )
      }
    }
  }, [cardTypes.currentData])

  const onContinue = async (amount: number) => {
    const response: any = await mintGiftCard({
      cardTypeId: cardTypes.currentData[cardTypeId.current].id,
      amount,
    })

    const error = response?.error?.data?.error || response?.data?.errorMessage
    const formUrl = response?.data?.formUrl
    if (formUrl) {
      vibration.success()
      selectNominalRef.current?.setRequestError('')
      selectNominalRef.current?.close?.()
      navigate('payment', {formUrl})
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
      <SelectNominal
        isLoading={isLoading}
        onSubmit={onContinue}
        ref={selectNominalRef}
      />
    </>
  )
}
