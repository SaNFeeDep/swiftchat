import styled, { CSSObject } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

export const Label = styled.label<{ sx?: CSSObject }>`
  ${({ sx }) => sx}
`

export const CmbContainer = styled.div<{ sx?: CSSObject }>`
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 30px;
  background-color: #d9d9d9;
  transition: all 0.2s ease 0s;
  user-select: none;

  ${({ sx }) => sx};
`

export const InnerContainer = styled.div`
  gap: 10px;
  height: 100%;
  padding: 5px;
  justify-content: space-between;
  display: flex;
  align-items: center;
`

export const Text = styled.div`
  padding: 0 5px;
  color: #040404;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 12px;
  cursor: pointer;
  height: 100%;
  transform: rotate(0deg);
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s;

  & svg {
    width: 12px;
    height: 12px;
  }

  &.openned {
    transform: rotate(180deg);
  }
`

export const List = styled.ul<{ listHeight: number }>`
  list-style: none;
  width: 100%;
  border-radius: 3px;
  position: absolute;
  top: 40px;
  box-shadow: rgba(0, 0, 0, 0.173) 0px 1px 2px;
  background-color: #d9d9d9;
  overflow: hidden;
  height: 0px;
  z-index: 999;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s;

  &.opened {
    height: ${({ listHeight }) => listHeight}px;
  }
`

export const ItemList = styled.li`
  color: #040404;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 5px;
  height: 29px;
  cursor: pointer;
  user-select: none;
  background-color: #d9d9d9;

  &:hover,
  &.active {
    background-color: #999999;
  }
`
