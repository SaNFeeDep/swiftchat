import { Icon } from '../Icon'
import { CheckboxContainer } from './SCheckbox'

type IProps = {
  value: boolean
  onClick: (value: boolean) => void
}

export const Checkbox: React.FC<IProps> = ({ value, onClick }) => {
  return (
    <CheckboxContainer
      className={value ? 'open' : ''}
      onClick={() => onClick(!value)}>
      {value && <Icon size={12} fill='#fff' name='#checkbox' />}
      <div className='shape'></div>
    </CheckboxContainer>
  )
}
