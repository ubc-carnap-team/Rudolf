export interface FeedbackMessage {
  status: 'correct' | 'incorrect' | 'parsing'
  message: string
}

export interface FeedbackNode {
  feedback: FeedbackMessage[]
  forest: FeedbackNode[]
}

export interface TreeForm {
  resolved: boolean
  row: number
  value: string
}

export type OutputNode = FormulaNode | ContradictionNode | FinishedNode

export type FormulaNode = {
  nodeType: 'formulas'
  forest: OutputNode[] | [FinishedNode] | [ContradictionNode]
  formulas: TreeForm[]
  rule: string
}

// We mark a branch as closed by adding a

export type FinishedNode = {
  nodeType: 'finished'
  formulas: []
  rule: string // ['O', ...number[]] // List of resolved rows? on the branch
}

export type ContradictionNode = {
  nodeType: 'contradiction'
  formulas: []
  rule: string // ['X', number, number] e.g X
}
