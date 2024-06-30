import { CSSObject } from 'styled-components'

export type ICalendarMonthType = 'prev' | 'current' | 'next'

export type ICalendarAnimDirection = 'left' | 'right' | 'top' | 'bottom' | ''

export interface ICalendar {
  /**
   * Стили
   */
  sx?: CSSObject

  /**
   * Значение
   */
  value?: string

  /**
   * Изменения
   */
  onChange?: (value: string) => void
}

export interface ICalendarDays {
  time: Date
  day: number
  disabled: boolean
  type: ICalendarMonthType
}
