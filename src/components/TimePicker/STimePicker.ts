import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 340px;
  min-width: 340px;
  max-width: 340px;
  padding: 12px 18px;
  background-color: #00000070;
  border-radius: 30px;
  gap: 10px;
  height: 42px;

  &.openned {
    height: max-content;
  }
`

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  user-select: none;
`

export const IconContainer = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 22px;
  padding: 0 5px;
  transform: rotate(0deg);
  transition: transform 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s;

  & svg {
    width: 12px;
    height: 12px;
    fill: #ffffff;
  }

  &.openned {
    transform: rotate(180deg);
  }
`

export const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;

  & button {
    height: 35px;
  }
`
