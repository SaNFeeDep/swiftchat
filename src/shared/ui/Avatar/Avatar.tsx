import { IAvatarProps } from './IAvatar'
import { AvatarContainer, AvatarImage, AvatarStatus } from './SAvatar'

export const Avatar: React.FC<IAvatarProps> = ({
  size = 'middle',
  src,
  isOnline,
  onClick,
}) => {
  return (
    <AvatarContainer onClick={onClick} sizeType={size}>
      <AvatarImage src={src} />
      <AvatarStatus sizeType={size} className={isOnline ? 'online' : ''} />
    </AvatarContainer>
  )
}
