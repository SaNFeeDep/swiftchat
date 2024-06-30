import { useId, useMemo, useRef, useState } from 'react'
import { svgIcons } from '../../constants'
import { useOnClickOutside } from '../../hooks'
import { IComboboxProps } from './ICombobox'
import {
  CmbContainer,
  Container,
  Icon,
  InnerContainer,
  ItemList,
  Label,
  List,
  Text,
} from './SCombobox'

const Combobox = <T extends string | number>({
  label,
  labelSx,
  sx,
  data,
  value,
  onChange,
}: IComboboxProps<T>) => {
  const id = useId()
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(wrapperRef, () => {
    setOpen(false)
  })

  const listHeight = data.length * 29

  const onToggleHandler = () => {
    setOpen((p) => !p)
  }

  const onChangeHandler = (val: T) => {
    setOpen(false)
    onChange(val)
  }

  const currentText = useMemo(() => {
    const finded = data.find((d) => d.value === value)

    if (!finded) {
      onChange(data[0].value)
      return data[0].text
    }

    return finded.text
  }, [value])

  return (
    <Container ref={wrapperRef}>
      {label && (
        <Label sx={labelSx} onClick={onToggleHandler} htmlFor={id}>
          {label}
        </Label>
      )}

      <CmbContainer sx={sx}>
        <InnerContainer>
          <Text>{currentText}</Text>
          <Icon className={open ? 'openned' : ''} onClick={onToggleHandler}>
            {svgIcons.arrow}
          </Icon>
        </InnerContainer>

        <List listHeight={listHeight} className={open ? 'opened' : ''}>
          {data.map(({ text, value }) => (
            <ItemList
              className={text === currentText ? 'active' : ''}
              onClick={() => onChangeHandler(value)}>
              {text}
            </ItemList>
          ))}
        </List>
      </CmbContainer>
    </Container>
  )
}

export default Combobox
