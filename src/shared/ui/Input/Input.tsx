import styled from 'styled-components'

type IProps = Omit<JSX.IntrinsicElements['input'], 'ref'>

export const Input: React.FC<IProps> = ({ ...restProps }) => {
  return <StyledInput {...restProps} />
}

const StyledInput = styled.input`
  outline: none;
  background-color: #ffffff;
  border: 1px solid #d4d4dd;
  color: #191816;
  padding: 8px 16px;
  border-radius: 12px;
  transition: 0.2s all ease;

  &:focus {
    border: 1px solid #08aa8d;
  }
`
