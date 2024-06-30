export enum RoutesPaths {
  DEFAULT = '/',
  NOT_FOUND = '*',
  AUTH = 'auth',
  CHAT = 'chat',
  REGISTRATION = 'registration',
}

export type RoutesArrayType = {
  path: string
  element: (() => React.ReactNode) | React.ReactNode
}
