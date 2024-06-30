import { Menu } from '../../../features/menu'
import { chatMenuItems } from '../config'

type IProps = {
  open?: boolean
  onClick: (action: string) => void
}

export const ChatMenu: React.FC<IProps> = ({ open, onClick }) => {
  return <Menu open={open} items={chatMenuItems} onClick={onClick} />
}
