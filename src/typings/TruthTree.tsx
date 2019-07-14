import { printTerm, Term } from './Term'

export interface TreeNode {
  term: Term
  name: string
  children: TreeNode[]
  resolved: boolean
}

export type Strategy = 'split' | 'stack'

export const TreeNode = (term: Term, children: TreeNode[] = []): TreeNode => ({
  term: term,
  name: printTerm(term),
  children: children,
  resolved: false,
})
