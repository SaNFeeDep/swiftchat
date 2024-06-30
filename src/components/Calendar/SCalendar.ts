import styled, { css, CSSObject } from 'styled-components'
import { ICalendarAnimDirection } from './ICalendar'

const getAnimationProps = (direction: ICalendarAnimDirection) =>
  ({
    left: {
      enter: 'translateX(-100%)',
      active: 'translateX(0%)',
      exit: 'translateX(100%)',
    },
    right: {
      enter: 'translateX(100%)',
      active: 'translateX(0%)',
      exit: 'translateX(-100%)',
    },
    top: {
      enter: 'translateY(-100%)',
      active: 'translateY(0%)',
      exit: 'translateY(100%)',
    },
    bottom: {
      enter: 'translateY(100%)',
      active: 'translateY(0%)',
      exit: 'translateY(-100%)',
    },
    '': { enter: '', active: '', exit: '' },
  }[direction])

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const Container = styled.div<{ sxStyle?: CSSObject }>`
  width: 420px;
  height: 300px;
  overflow: hidden;

  ${({ sxStyle }) => sxStyle}
`

export const Header = styled.div`
  height: 24px;
  margin: 10px 0;
  display: flex;
  color: #fff;
  justify-content: space-around;
  align-items: center;
  user-select: none;
`

export const HeaderBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #7a098a;
  padding: 2px 8px;
  border-radius: 4px;

  & span {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 4px;
    height: 100%;
  }
`

export const Controller = styled.div<{ isPrev?: boolean }>`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    & > svg {
      fill: #fff;
    }
  }

  & > svg {
    width: 20px;
    height: 20px;
    fill: #d3d3d3;
    transition: fill 0.2s ease;
    transform: ${({ isPrev }) => (isPrev ? 'rotate(90deg)' : 'rotate(-90deg)')};
  }
`

export const DaysWeek = styled.div`
  user-select: none;
  display: grid;
  column-gap: 20px;
  height: 19px;
  padding: 0 41px;
  grid-template-columns: repeat(8, 24px);
  text-align: center;
  color: #b3b3b3;

  & .month {
    width: 22px;
    font-weight: 200;
  }

  & span {
    width: 14px;
    height: 14px;
    line-height: 14px;
    text-align: center;
    user-select: none;
  }
`

export const DaysWrapperOverflow = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  user-select: none;
`

export const DaysWrapper = styled.div<{
  animationDirection: ICalendarAnimDirection
}>`
  width: 100%;
  grid-template-columns: repeat(8, 24px);
  row-gap: 14px;
  column-gap: 20px;
  padding: 12px 22px;
  display: grid;

  ${({ animationDirection }) => {
    if (animationDirection !== '') {
      const { enter, active, exit } = getAnimationProps(animationDirection)
      return css`
        &.fade {
          &-enter {
            opacity: 0;
            transform: ${enter};
          }
          &-enter-active {
            opacity: 1;
            transform: ${active};
          }
          &-exit {
            opacity: 1;
            transform: ${active};
          }
          &-exit-active {
            opacity: 0;
            transform: ${exit};
          }
          &-enter-active,
          &-exit-active {
            transition: opacity 200ms, transform 200ms;
          }
        }
      `
    }
  }}
`

export const WeekNumber = styled.div`
  font-weight: 200;
  color: #b3b3b3;
`

export const Day = styled.div`
  width: 24px;
  height: 24px;
  display: block;
  text-align: center;
  cursor: pointer;
  user-select: none;
  line-height: 24px;
  padding-left: 1px;
  transition: all 0.1s ease-out;
  border-radius: 5px;

  &.week-end {
    color: #2fa4c8;
  }

  &.week-end.not-current {
    color: #2c6eab;
  }

  &.not-current {
    color: #616161;
  }

  &.selected:not(.not-current),
  &:hover:not(.not-current) {
    background-color: #7a098a;
    color: #fff;
  }
`
