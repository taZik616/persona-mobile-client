import React, {useRef} from 'react'

import {
  GiftCard,
  SelectNominal,
  SelectNominalRefType,
} from 'src/components/GiftCard'
import {useScreenBlockPortrait} from 'src/hooks'

export const GiftCardScreen = () => {
  const selectNominalRef = useRef<SelectNominalRefType>(null)
  useScreenBlockPortrait()
  const onPressSelectNominal = () => {
    selectNominalRef.current?.open?.()
  }

  const onContinue = (count: number, cost: number) => {
    console.log('🚀 - cost:', cost)
    console.log('🚀 - count:', count)
    selectNominalRef.current?.close?.()
  }

  return (
    <>
      <GiftCard onPressSelectNominal={onPressSelectNominal} />
      <SelectNominal onSubmit={onContinue} ref={selectNominalRef} />
    </>
  )
}
