import { TreeForm } from './CarnapAPI'

/**
 * TODOS
 * 2. make closed nodes work more like output
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
export type NodeMutater = (node: TreeNode) => void

export type OpenLeafNode = TreeNode & { forest: [] }

export type ClosedLeafNode = TreeNode & { forest: 'contradiction' }

export type FinishedLeafNode = TreeNode & { forest: 'finished' }
