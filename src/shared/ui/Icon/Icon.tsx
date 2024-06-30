import styled, { CSSObject, css, useTheme } from 'styled-components'
import { flHeight, flWidth } from '../../lib'
import { ThemeType } from '../../../app/providers'

interface IIconProps {
  name: string
  sx?: CSSObject
  className?: string
  size?: number | string
  width?: number | string
  height?: number | string
  fill?: string | ((theme: ThemeType) => string)
}

type Sizes = {
  w: string | number
  h: string | number
}

export const Icon: React.FC<IIconProps> = ({
  sx,
  name,
  width = '16px',
  height = '16px',
  fill = '#000',
  size = '16px',
  className = '',
  ...restProps
}) => {
  const theme = useTheme()
  const fillColor = typeof fill === 'function' ? fill(theme) : fill

  const sizes = size ? { w: size, h: size } : { w: width, h: height }

  return (
    <Svg
      sx={sx}
      className={className}
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      fill={fillColor}
      sizes={sizes}
      {...restProps}>
      <use xlinkHref={name} />
    </Svg>
  )
}

const Svg = styled.svg<{ sizes: Sizes; sx?: CSSObject }>`
  ${({ sizes }) => css`
    ${flWidth(sizes.w)};
    ${flHeight(sizes.h)}
  `};

  ${({ sx }) => sx}
`
