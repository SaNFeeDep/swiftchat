import styled from 'styled-components'

export type IMenuItemProps = {
  title: string
  imageSrc: string
  isDangeros?: boolean
  onClick: () => void
}

export const MenuItem: React.FC<IMenuItemProps> = ({
  title,
  imageSrc,
  isDangeros,
  onClick,
}) => {
  return (
    <Container className={isDangeros ? 'dangeros' : ''} onClick={onClick}>
      <Span imageSrc={imageSrc} />
      <span>{title}</span>
    </Container>
  )
}

const Container = styled.div`
  padding: 8px 12px;
  border-radius: 5px;
  display: flex;
  gap: 16px;
  color: #191816;
  transition: 0.2s all ease;
  cursor: pointer;

  & > span {
    font-weight: 600;
    font-size: 16px;
  }

  &:hover {
    background-color: #d4d4dd;
  }

  &.dangeros {
    color: #ff0001;

    &:hover {
      background-color: #ffd8d8;
    }
  }
`

const Span = styled.span<{ imageSrc: string }>`
  width: 20px;
  height: 20px;
  background-image: url(${({ imageSrc }) => imageSrc});
  background-size: cover;
  background-repeat: no-repeat;
`
