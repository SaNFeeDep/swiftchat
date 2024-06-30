import { Menu } from '../../../features/menu'
import { messageMenuItems } from '../config'

type IProps = {
  open?: boolean
  onClick: (action: string) => void
}

export const MessageMenu: React.FC<IProps> = ({ open, onClick }) => {
  return <Menu open={open} items={messageMenuItems} onClick={onClick} />
}
