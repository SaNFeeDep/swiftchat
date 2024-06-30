import { useState } from 'react'
import { svgIcons } from '../../constants'
import Button from '../../shared/ui/Button'
import {
  Container,
  ContentContainer,
  IconContainer,
  InnerContainer,
  Wrapper,
} from './STimePicker'

type IProps<T extends string | number> = {
  value: T
  items: T[]
  title: string
  isOpen?: boolean
  onClick: (val: T) => void
}

const TimePicker = <T extends string | number>({
  title,
  value,
  items,
  isOpen,
  onClick,
}: IProps<T>) => {
  const [open, setOpen] = useState(isOpen ?? false)

  const onToggleHandler = () => {
    setOpen((p) => !p)
  }

  const renderButtons = () =>
    items.map((item, i) => (
      <Button
        active={item === value}
        onClick={() => onClick(item)}
        key={item + i.toString()}>
        {item}
      </Button>
    ))

  return (
    <Wrapper>
      <Container className={open ? 'openned' : ''}>
        <InnerContainer>
          <div>{title}</div>

          <IconContainer
            className={open ? 'openned' : ''}
            onClick={onToggleHandler}>
            {svgIcons.arrow}
          </IconContainer>
        </InnerContainer>

        <ContentContainer>{renderButtons()}</ContentContainer>
      </Container>
    </Wrapper>
  )
}

export default TimePicker
