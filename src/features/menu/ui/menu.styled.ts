import styled from 'styled-components'

export const MenuContainer = styled.div`
  width: max-content;
  height: max-content;

  display: flex;
  flex-direction: column;

  padding: 12px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 0 12px #19181626;
  transition: 0.2s all cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(0);
  opacity: 0.5;
  transform-origin: left top;

  &.open {
    opacity: 1;
    transform: scale(1);
  }
`
