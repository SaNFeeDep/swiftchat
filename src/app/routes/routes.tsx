import { Navigate } from 'react-router-dom'
import { RoutesArrayType, RoutesPaths } from './config'
import { Chat, Auth, Registration } from '../../pages'

export const RoutesArray: RoutesArrayType[] = [
  {
    path: RoutesPaths.NOT_FOUND,
    element: <Navigate to={RoutesPaths.CHAT} />,
  },
  {
    path: RoutesPaths.CHAT,
    element: <Chat />,
  },
  {
    path: RoutesPaths.AUTH,
    element: <Auth />,
  },
  {
    path: RoutesPaths.REGISTRATION,
    element: <Registration />,
  },
]
