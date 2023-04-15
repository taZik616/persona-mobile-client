import React, {useEffect} from 'react'

import {ActionSheetIOS} from 'react-native'

import {Color} from 'src/themes'

import {ActionsSheetProps} from './index'

export const ActionsSheet = ({
  onPressFirstOpt,
  onPressSecondOpt,
  onCancel,
  firstOpt,
  secondOpt,
  title,
}: ActionsSheetProps) => {
  useEffect(() => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          /* getText(I18N.actionSheetKeepEditing),
          getText(I18N.actionSheetDiscard), */
          'Отмена',
          firstOpt,
          secondOpt,
        ],
        title,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            onCancel()
            break
          case 1:
            onPressFirstOpt?.()
            break
          case 2:
            onPressSecondOpt?.()
            break
        }
      },
    )
  }, [])
  return <></>
}
