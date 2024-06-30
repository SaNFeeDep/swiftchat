import styled from 'styled-components'

export const CheckboxContainer = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  border-width: 2px;
  border-style: solid;
  border-color: #8d969c;
  border-radius: 5px;
  background-color: #ffffff;

  overflow: hidden;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  & > svg {
    position: absolute;
    z-index: 2;
  }

  & .shape {
    position: absolute;
    top: -2px;
    left: -2px;
    width: 20px;
    height: 20px;
    background-color: #08aa8d;
    opacity: 0;
    transform: scale(0.5);
    transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &.open {
    border-color: #08aa8d;
    background-color: #08aa8d;

    & .shape {
      opacity: 1;
      transform: scale(1);
    }
  }
`

export const IconWrapper = styled.div``
