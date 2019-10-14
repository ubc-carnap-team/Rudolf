export interface TreeNode {
  label: string
  forest: TreeNode[]
  resolved: boolean
  closed: boolean
  rule: string
  id: string
}

export type NodeGenerator = (parentId: string) => TreeNode[]

export type NodeUpdater = (node: TreeNode) => TreeNode

export type LeafNode = TreeNode & { forest: [] }
