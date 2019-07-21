export interface ReactD3TreeItem {
  formula: string
  children: ReactD3TreeItem[]
  resolved: boolean
  closed: boolean
}

export type LeafNode = ReactD3TreeItem & { children: [] }
