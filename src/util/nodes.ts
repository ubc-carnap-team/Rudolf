import {
  ContradictionNode,
  FinishedNode,
  FormulaNode,
  NodeGenerator,
  OpenLeafNode,
  TreeForm,
  TreeNode,
} from '../typings/TreeState'
import { isNonEmptyArray } from './util'

export const makeNode = ({
  formulas = [],
  forest = [],
  id,
}: Partial<FormulaNode> & {
  id: string
}): FormulaNode => {
  return {
    nodeType: 'formulas',
    formulas,
    forest,
    id,
  }
}

export const makeContradictionNode = (parentId: string): ContradictionNode => ({
  nodeType: 'contradiction',
  formulas: [],
  contradictoryRows: '',
  id: `${parentId}0`,
})

export const makeFinishedNode = (parentId: string): FinishedNode => ({
  nodeType: 'finished',
  formulas: [],
  id: `${parentId}0`,
})

/**
 *
 * @param root The root of a subTree
 * @param createNodes function that creates new node objects
 */
export const destructivelyAppendChildren = (
  root: TreeNode,
  createNodes: NodeGenerator
): void => {
  if (root.nodeType === 'contradiction') {
    return
  } else if (root.nodeType === 'finished') {
    // TODO: Special Handling for FinishedNodes?
    console.warn("shouldn't try to append to finished branch")
    return
  } else if (root.forest.length === 0) {
    root.forest = createNodes(root.id)
  } else {
    root.forest.forEach((child) =>
      destructivelyAppendChildren(child, createNodes)
    )
  }
}

/**
 *
 * @param formulas an array of of formulas.
 */
export const parsePremises = (formulas: string[]): FormulaNode => {
  return makeNode({
    formulas: formulas.map((form, idx) => makeTreeForm(form, idx + 1)),
    forest: [],
    id: '',
  })
}

const makeTreeForm = (value = '', row: number): TreeForm => ({
  value,
  resolved: false,
  row,
})

export const isOpenLeaf = (node: TreeNode | null): node is OpenLeafNode =>
  node != null && node.nodeType === 'formulas' && node.forest.length === 0

export const lastRow = (node: FormulaNode) =>
  firstRow(node) + node.formulas.length

export const firstRow = (node: FormulaNode) => node.formulas[0].row

export const makeEmptyFormulas = (n: number, nextRow: number): TreeForm[] => {
  const arr = []
  while (n-- > 0) {
    arr.push(makeTreeForm('', nextRow++))
  }
  return arr
}

export const convertIdToPath = (id: string): (0 | 1)[] =>
  id.split('').map((char: string) => {
    if (char === '0' || char === '1') {
      return Number(char) as 0 | 1
    } else {
      throw new Error(`invalid character in node id: ${char} in ${id}`)
    }
  })

export const getNode = (root: FormulaNode, id: string): TreeNode => {
  const nodePath: (0 | 1)[] = convertIdToPath(id)
  let currentNode: TreeNode = root
  for (const idx of nodePath) {
    if (currentNode.nodeType !== 'formulas') {
      throw new Error('Failed to get node path')
    }
    currentNode = currentNode.forest[idx]
  }
  return currentNode
}

export const isNonLeafNode = (
  node: TreeNode
): node is FormulaNode & { forest: FormulaNode[] } =>
  isFormulaNode(node) &&
  isNonEmptyArray(node.forest) &&
  node.forest[0]?.nodeType === 'formulas'

export const isFormulaNode = (node: TreeNode): node is FormulaNode =>
  node.nodeType === 'formulas'
