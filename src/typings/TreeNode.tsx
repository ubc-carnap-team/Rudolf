export interface TreeNode {
  formula: string
  children: TreeNode[]
  resolved: boolean
  closed: boolean
}

export type LeafNode = TreeNode & { children: [] }
