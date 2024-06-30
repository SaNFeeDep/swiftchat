import React, { useRef } from 'react'
import { IButtonProps } from './IButton'
import { StyledButton } from './SButton'
import { CSSObject } from 'styled-components'

export const Button: React.FC<IButtonProps> = ({
  sx,
  ui = 'primary',
  size = 'primary',
  children,
  isDisabled,
  onClick,
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const createPulseAnimation = (clientX: number, clientY: number) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const newLeft = clientX - rect.left - size / 2
    const newTop = clientY - rect.top - size / 2

    const pulseDiv = document.createElement('div')
    pulseDiv.className = 'pulse'

    Object.assign(pulseDiv.style, {
      width: size + 'px',
      height: size + 'px',
      top: newTop + 'px',
      left: newLeft + 'px',
    } as CSSObject)

    buttonRef.current.appendChild(pulseDiv)

    setTimeout(() => pulseDiv.remove(), 700)
  }

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return
    createPulseAnimation(e.clientX, e.clientY)
    onClick?.(e)
  }

  return (
    <StyledButton
      ref={buttonRef}
      sx={sx}
      sizeType={size}
      uiType={ui}
      onClick={onClickHandler}>
      {children}
    </StyledButton>
  )
}
