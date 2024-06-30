import { MenuItem } from '../../../features/menu'
import { icons } from '../../../shared'

export const chatMenuItems: MenuItem[] = [
  {
    action: 'createUser',
    imageSrc: icons.user,
    title: 'Создать личный чат',
  },
  {
    action: 'createGroup',
    imageSrc: icons.group,
    title: 'Создать группу',
  },
  {
    action: 'createChannel',
    imageSrc: icons.megaphone,
    title: 'Создать канал',
  },
]
