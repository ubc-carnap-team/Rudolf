/**
 *  @TODO
 * 1. group formulas on single node in array.
 * 2. make closed nodes work more like output
 * 3. extract formula values to map
 *  */
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

export type OpenLeafNode = TreeNode & { forest: [] }

export type ClosedLeafNode = TreeNode & { forest: 'contradiction' }

export type FinishedLeafNode = TreeNode & { forest: 'finished' }
