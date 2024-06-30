import { IMenuItemProps, MenuItem } from '../../menu-item'
import { MenuContainer } from './menu.styled'

export type MenuItem = Omit<IMenuItemProps, 'onClick'> & {
  action: string
}

type IProps = {
  open?: boolean
  items: MenuItem[]
  onClick: (action: string) => void
}

export const Menu: React.FC<IProps> = ({ open, items, onClick }) => {
  return (
    <MenuContainer className={open ? 'open' : ''}>
      {items.map(({ action, ...rest }) => (
        <MenuItem {...rest} onClick={() => onClick(action)} />
      ))}
    </MenuContainer>
  )
}
