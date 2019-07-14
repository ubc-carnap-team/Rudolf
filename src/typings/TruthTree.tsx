import { Formula } from './Formula'

export interface TreeNode {
  term: Formula
  children: TreeNode[]
  resolved: boolean
}

export type Strategy = 'split' | 'stack'
