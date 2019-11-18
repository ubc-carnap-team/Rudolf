export interface TreeNode {
  label: string
  forest: TreeNode[] | 'finished' | 'contradiction'
  resolved: boolean
  closed: boolean
  rule: string
  id: string
  row: number
}

export type NodeGenerator = (parentId: string, parentRow: number) => TreeNode[]

export type NodeUpdater = (node: TreeNode) => TreeNode

export type LeafNode = TreeNode & { forest: [] }
