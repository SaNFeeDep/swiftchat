export type ITab = {
  tabId: string
  title: string
}

export type ITabPanelProps = {
  tabs: ITab[]
  tabId: string
  onChange: (tabId: string) => void
}
