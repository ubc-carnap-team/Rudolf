import { Formula } from './Formula'

export interface TreeNode {
  term: Formula
  name: string
  children: TreeNode[]
  resolved: boolean
}

export type Strategy = 'split' | 'stack'
