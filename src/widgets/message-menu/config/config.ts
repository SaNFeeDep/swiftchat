import { MenuItem } from '../../../features/menu'
import { icons } from '../../../shared'

export const messageMenuItems: MenuItem[] = [
  {
    action: 'answer',
    imageSrc: icons.answerBack,
    title: 'Ответить',
  },
  {
    action: 'copy',
    imageSrc: icons.copy,
    title: 'Копировать',
  },
  {
    action: 'edit',
    imageSrc: icons.editing,
    title: 'Изменить',
  },
  {
    action: 'reply',
    imageSrc: icons.sendForward,
    title: 'Переслать',
  },
  {
    action: 'select',
    imageSrc: icons.select,
    title: 'Выбрать',
  },
  {
    action: 'delete',
    imageSrc: icons.delete,
    title: 'Удалить',
    isDangeros: true,
  },
]
