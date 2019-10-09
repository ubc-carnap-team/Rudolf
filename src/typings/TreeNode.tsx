export interface TreeNode {
  label: string
  forest: TreeNode[]
  resolved: boolean
  closed: boolean
  rule: string
}

export type NodeUpdater = (node: TreeNode) => TreeNode

export type LeafNode = TreeNode & { forest: [] }
