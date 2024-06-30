import { CSSObject } from 'styled-components'

type CSSColor = CSSObject['color']
type CSSBackgroundColor = CSSObject['backgroundColor']

export type ButtonUIType =
  | 'default'
  | 'main'
  | 'transparent'
  | 'onlyhover'
  | 'primary'

export type ButtonSizeType = 'default' | 'big' | 'middle' | 'small' | 'primary'

export interface IButtonProps {
  children: React.ReactNode
  isDisabled?: boolean
  active?: boolean
  sx?: CSSObject
  ui?: ButtonUIType
  size?: ButtonSizeType
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export type ButtonStyleSize = Pick<CSSObject, 'width' | 'height'>

export type ButtonStyleUi = {
  iconFill: CSSColor
  iconHover?: CSSColor
  iconActiveFill?: CSSColor
  backgroundColor: CSSBackgroundColor
  backgroundColorHover?: CSSBackgroundColor
  backgroundColorActive?: CSSBackgroundColor
  focuseBorderColor?: CSSColor
}
