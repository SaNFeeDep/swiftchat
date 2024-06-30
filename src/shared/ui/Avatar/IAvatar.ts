export type AvatarSizeType = 'big' | 'middle' | 'small'

export interface IAvatarProps {
  size?: AvatarSizeType
  src: string
  isOnline?: boolean
  onClick?: () => void
}
