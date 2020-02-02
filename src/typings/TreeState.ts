/**
 * The shared properties of all nodes
 */
interface TreeNodeProps {
  formulas: TreeForm[]
  rule: string
  id: string
}

export type TreeNode = FormulaNode | FinishedNode | ContradictionNode

export type NodeGenerator = (
  parentId: string,
  parentRow: number
) => FormulaNode[]

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
  rule: string
}

// We mark a branch as closed by adding a special node

export interface FinishedNode extends TreeNodeProps {
  nodeType: 'finished'
  formulas: []
  rule: string // ['O', ...number[]] // List of resolved rows? on the branch
}

export interface ContradictionNode extends TreeNodeProps {
  nodeType: 'contradiction'
  formulas: []
  rule: string // ['X', number, number] e.g X
}

export interface FeedbackMessage {
  status: 'correct' | 'incorrect' | 'parsing'
  message: string
}

export interface FeedbackNode {
  feedback: FeedbackMessage[]
  forest: FeedbackNode[]
}
