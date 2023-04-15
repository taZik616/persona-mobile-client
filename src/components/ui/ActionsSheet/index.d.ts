export interface ActionsSheetProps {
  onPressFirstOpt?: () => void
  onCancel: () => void
  onPressSecondOpt?: () => void
  title?: string
  firstOpt: string
  secondOpt: string
}

export function ActionsSheet(props: ActionsSheetProps): JSX.Element
