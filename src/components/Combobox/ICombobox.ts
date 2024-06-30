import { CSSObject } from 'styled-components'

export type ComboboxData<T extends string | number = string> = {
  text: string
  value: T
}

export type IComboboxProps<T extends string | number> = {
  label?: string
  labelSx?: CSSObject
  sx?: CSSObject
  data: ComboboxData<T>[]
  value: T
  onChange: (value: T) => void
}
