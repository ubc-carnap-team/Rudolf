export interface TreeNode {
  name?: string
  attributes?: {
    [key: string]: string
  }
  children: TreeNode[]
  resolved?: boolean
  closed?: boolean
  _collapsed?: boolean
}

export type LeafNode = TreeNode & { children: [] }
