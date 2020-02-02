import { FormulaNode } from '../typings/TreeState'

export const isEmptyArray = <T>(
  maybeArray: Array<T> | string
): maybeArray is [] => Array.isArray(maybeArray) && maybeArray.length === 0

export const isNonEmptyArray = <T>(maybeArray: unknown): maybeArray is T[] =>
  Array.isArray(maybeArray) && maybeArray.length !== 0

export const isNonLeafNode = (node: FormulaNode) =>
  isNonEmptyArray(node.forest) && node.forest[0]?.nodeType === 'formulas'
