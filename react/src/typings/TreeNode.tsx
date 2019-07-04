import { Term, printTerm } from './Term'
export interface TreeNode {
  term: Term
  name: string
  children: SubTree
}
export type Leaf = []

export type Stack = [TreeNode]

export type Split = [TreeNode, TreeNode]

export type SubTree = Leaf | Stack | Split

export const TreeNode = (term: Term, children: SubTree = []): TreeNode => ({
  term: term,
  name: printTerm(term),
  children: children,
})
// export const Split = (lhs: TreeNode, rhs: TreeNode): [TreeNode, TreeNode] => [lhs, rhs]

// export const Stack = (next: TreeNode, next): [TreeNode] => [next]
