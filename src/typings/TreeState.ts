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
  // rule: string // ['O', ...number[]] // List of resolved rows? on the branch
  resolvedRows: number[]
}

export interface ContradictionNode extends TreeNodeProps {
  nodeType: 'contradiction'
  formulas: []
  // rule: string // ['X', number, number] e.g X
  contradictoryRows: string
}

export interface FeedbackMessage {
  status: 'correct' | 'incorrect' | 'parsing'
  message: string
}

export interface FeedbackNode {
  feedback: FeedbackMessage[]
  forest: FeedbackNode[]
}

export interface Justification {
  rule: string
  parentRow: string
}

export type JustificationMap = {
  [firstRow: number]: Justification
}
