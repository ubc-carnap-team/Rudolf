export interface TreeNode {
  label: string
  forest: TreeNode[]
  resolved: boolean
  closed: boolean
  rule: string
  id: string
  row: number
  split: boolean
}

export type NodeGenerator = (parentId: string, parentRow: number) => TreeNode[]

export type NodeUpdater = (node: TreeNode) => TreeNode

export type LeafNode = TreeNode & { forest: [] }
