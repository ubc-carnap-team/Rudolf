export interface TreeNode {
  label: string
  forest: TreeNode[]
  resolved: boolean
  closed: boolean
  rule: string
}

export type LeafNode = TreeNode & { forest: [] }
