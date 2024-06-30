import styled, { css } from 'styled-components'
import { AvatarSizeType } from './IAvatar'

const sizes: Record<AvatarSizeType, number> = {
  big: 120,
  middle: 48,
  small: 32,
}

const statusSizes: Record<AvatarSizeType, number> = {
  big: 0,
  middle: 12,
  small: 8,
}

export const AvatarContainer = styled.div<{ sizeType: AvatarSizeType }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  ${({ sizeType }) => {
    const size = sizes[sizeType]

    return css`
      width: ${size}px;
      height: ${size}px;
    `
  }}
`

export const AvatarStatus = styled.div<{ sizeType: AvatarSizeType }>`
  position: absolute;
  bottom: 0;
  right: 0;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background-color: #08aa8d;
  transform: scale(0);
  opacity: 0.5;
  transition: 0.3s all cubic-bezier(0.63, 0.03, 0.15, 1.16);

  &.online {
    opacity: 1;
    transform: scale(1);
  }

  ${({ sizeType }) => {
    const size = statusSizes[sizeType]
    return css`
      width: ${size}px;
      height: ${size}px;
    `
  }}
`

export const AvatarImage = styled.div<{ src: string }>`
  background-image: url(${({ src }) => src});
  background-size: cover;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`
