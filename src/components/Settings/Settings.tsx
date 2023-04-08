import React from 'react'

import {Color} from 'src/themes'

import {SettingsButton} from './SettingsButton'

import {CustomHeader} from '../ui/CustomHeader'

interface SettingsProps {
  onPressEdit: () => void
  onPressWallet: () => void
  onPressDisconnect: () => void
  onPressBack: () => void
  onPressThemes: () => void
}
export function Settings({
  onPressEdit,
  onPressWallet,
  onPressDisconnect,
  onPressThemes,
  onPressBack,
}: SettingsProps) {
  return (
    <>
      <CustomHeader
        iconLeft="arrow-back"
        title="Settings"
        colorLeft={Color.primary}
        onPressLeft={onPressBack}
      />
      <SettingsButton
        icon="person"
        title="Edit Username"
        onPress={onPressEdit}
      />
      <SettingsButton icon="wallet" title="My Wallet" onPress={onPressWallet} />
      <SettingsButton
        icon="albums-outline"
        title="Themes"
        onPress={onPressThemes}
      />
      <SettingsButton
        icon="exit"
        title="Disconnect"
        onPress={onPressDisconnect}
      />
    </>
  )
}
