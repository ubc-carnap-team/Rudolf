export interface FeedbackMessage {
  status: 'correct' | 'incorrect' | 'parsing'
  message: string
}

export interface InfoNode {
  closed: boolean
  feedback: FeedbackMessage[]
  forest: InfoNode[]
}

export interface TreeForm {
  resolved: boolean
  row: number
  value: string
}

export type OutputNode = NonTerminalNode | TerminalNode

export type TerminalNode = ContradictionNode | FinishedNode

export interface NonTerminalNode {
  nodeType: 'formulas'
  closed: boolean
  forest: OutputNode[]
  formulas: TreeForm[]
  id: string
  rule: string
}

export interface FinishedNode {
  nodeType: 'finished'
  formulas: []
  rule: string // ['finished', ...number[]] // List of resolved rows? on the branch
}

export interface ContradictionNode {
  nodeType: 'contradiction'
  formulas: []
  rule: ['contradiction', number, number] // []
}
