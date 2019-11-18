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

export type OutputNode = NonTerminalNode | TerminalNode

export type TerminalNode = ContradictionNode | FinishedNode

export type NonTerminalNode = {
  nodeType: 'formulas'
  forest: OutputNode[] | [FinishedNode] | [ContradictionNode]
  formulas: TreeForm[]
  rule: string
}

export type FinishedNode = {
  nodeType: 'finished'
  formulas: []
  rule: string // ['finished', ...number[]] // List of resolved rows? on the branch
}

export type ContradictionNode = {
  nodeType: 'contradiction'
  formulas: []
  rule: string // ['contradiction', number, number] // []
}
