import { TreeForm } from './CarnapAPI'

/**
 *  @TODO
 * 1. group formulas on single node in array.
 * 2. make closed nodes work more like output
 * 3. extract formula values to map
 *  */
export interface TreeNode {
  formulas: TreeForm[]
  forest: TreeNode[] | 'finished' | 'contradiction'
  closed: boolean
  rule: string
  id: string
}

export type NodeGenerator = (parentId: string, parentRow: number) => TreeNode[]

export type NodeUpdater = (node: TreeNode) => TreeNode

export type OpenLeafNode = TreeNode & { forest: [] }

export type ClosedLeafNode = TreeNode & { forest: 'contradiction' }

export type FinishedLeafNode = TreeNode & { forest: 'finished' }
