/**
 * The shared properties of all nodes
 */
interface TreeNodeProps {
  id: string
}

export type TreeNode = FormulaNode | FinishedNode | ContradictionNode

export type NodeGenerator = (parentId: string) => FormulaNode[]

export type OpenLeafNode = FormulaNode & { forest: [] }

export interface TreeForm {
  resolved: boolean
  row: number
  value: string
}

export interface FormulaNode extends TreeNodeProps {
  nodeType: 'formulas'
  forest: TreeNode[]
  formulas: TreeForm[]
}

// We mark a branch as closed by adding a special node

export interface FinishedNode extends TreeNodeProps {
  nodeType: 'finished'
  formulas: []
}

export interface ContradictionNode extends TreeNodeProps {
  nodeType: 'contradiction'
  formulas: []
  contradictoryRows: string
}

export interface Justification {
  rule: string
  parentRow: string
}

export type JustificationMap = {
  [firstRow: number]: Justification
}
