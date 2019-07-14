export interface TreeNode {
  formula: string
  children: TreeNode[]
  resolved: boolean
}

export type Strategy = 'split' | 'stack'
