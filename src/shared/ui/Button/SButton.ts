import styled, { CSSObject, css, keyframes } from 'styled-components'
import {
  ButtonSizeType,
  ButtonStyleSize,
  ButtonStyleUi,
  ButtonUIType,
} from './IButton'

const sizes: Record<ButtonSizeType, ButtonStyleSize> = {
  big: { width: '64px', height: '64px' },
  middle: { width: '40px', height: '40px' },
  small: { width: '24px', height: '24px' },
  default: { width: '100%' },
  primary: { height: '50px' },
}

const uiVariant: Record<ButtonUIType, ButtonStyleUi> = {
  default: {
    iconFill: '#12121280',
    iconHover: '#121212',
    iconActiveFill: '#121212',
    backgroundColor: 'transparent',
    backgroundColorHover: '#D4D4DD',
    backgroundColorActive: '#EFF0F5',
    focuseBorderColor: '#99C0F0',
  },
  main: {
    iconFill: '#ffffff',
    backgroundColor: '#08AA8D',
    backgroundColorHover: '#059278',
    focuseBorderColor: '#E5F3FE',
  },
  transparent: {
    iconFill: '#08AA8D',
    iconHover: '#059278',
    iconActiveFill: '#08AA8DB3',
    backgroundColor: 'transparent',
  },
  onlyhover: {
    iconFill: '#cccccc',
    iconHover: '#999999',
    iconActiveFill: '#cccccc',
    backgroundColor: 'transparent',
  },
  primary: {
    backgroundColor: '#08AA8D',
    backgroundColorHover: '#059278',
    iconFill: 'transparent',
  },
}

const style = (bg: CSSObject['backgroundColor'], icon: CSSObject['color']) =>
  css`
    background-color: ${bg};

    & > svg {
      fill: ${icon};
    }
  `

const PulseKeys = keyframes`
  100% {
    transform: scale(2);
    background-color: #fff;
    opacity: 0
  }
`

export const StyledButton = styled.button<{
  sx?: CSSObject
  sizeType: ButtonSizeType
  uiType: ButtonUIType
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;

  & > svg {
    transition: all 0.2s ease;
  }

  ${({ uiType, sizeType }) => {
    const uiStyle = uiVariant[uiType]
    const sizeStyle = sizes[sizeType]

    const bgHover = uiStyle.backgroundColorHover ?? uiStyle.backgroundColor
    const iconHover = uiStyle.iconHover ?? uiStyle.iconFill

    const bgActive = uiStyle.backgroundColorActive
    const iconActive = uiStyle.iconActiveFill ?? uiStyle.iconFill

    return css`
      width: ${sizeStyle.width};
      height: ${sizeStyle.height};

      & .pulse {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
        animation: ${PulseKeys} 0.7s ease-out;
        background-color: #03d3ae;
        opacity: 0.7;
      }

      ${style(uiStyle.backgroundColor, uiStyle.iconFill)}

      &:hover {
        ${style(bgHover, iconHover)}
      }

      &:focus,
      &:active {
        ${style(bgActive, iconActive)}
      }
    `
  }}
`
