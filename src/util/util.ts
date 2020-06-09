import { FormulaNode, TreeNode } from '../typings/TreeState'

export const isEmptyArray = <T>(
  maybeArray: Array<T> | string
): maybeArray is [] => Array.isArray(maybeArray) && maybeArray.length === 0

export const isNonEmptyArray = <T>(maybeArray: unknown): maybeArray is T[] =>
  Array.isArray(maybeArray) && maybeArray.length !== 0

export const isNonLeafNode = (
  node: TreeNode
): node is FormulaNode & { forest: FormulaNode[] } =>
  isFormulaNode(node) &&
  isNonEmptyArray(node.forest) &&
  node.forest[0]?.nodeType === 'formulas'

export const isFormulaNode = (node: TreeNode): node is FormulaNode =>
  node.nodeType === 'formulas'
