import {
  OpenLeafNode,
  NodeGenerator,
  NodeUpdater,
  TreeNode,
  ClosedLeafNode,
  FinishedLeafNode,
  NodeMutater,
} from '../typings/TreeState'
import { TreeForm } from '../typings/CarnapAPI'
import { lastEl } from './helpers'

export const makeNode = ({
  formulas,
  forest = [],
  rule = '',
  id,
  row = 0,
}: Omit<Partial<TreeNode>, 'formulas'> & {
  id: string
  row: number
  formulas?: string[]
}): TreeNode => ({
  formulas: formulas
    ? formulas.map((form, index) => makeTreeForm(form, index + row))
    : [makeTreeForm('', row)],
  forest,
  closed: false,
  rule,
  id,
})

/**
 *
 * @param root The root of a subTree
 * @param createNodes function that creates new node objects
 */
export const appendChildren = (
  root: TreeNode,
  createNodes: NodeGenerator
): TreeNode => {
  if (typeof root.forest === 'string') {
    return root
  } else if (root.forest.length === 0) {
    return root.closed
      ? root
      : { ...root, forest: createNodes(root.id, lastRow(root) + 1) } // TODO
  } else {
    return {
      ...root,
      forest: root.forest.map<TreeNode>((child: TreeNode) =>
        appendChildren(child, createNodes)
      ),
    }
  }
}

/**
 *
 * @param root The root of a subTree
 * @param createNodes function that creates new node objects
 */
export const destructivelyAppendChildren = (
  root: TreeNode,
  createNodes: NodeGenerator
): void => {
  if (typeof root.forest === 'string') {
  } else if (root.forest.length === 0) {
    if (!root.closed) {
      root.forest = createNodes(root.id, -1)
    }
  } else {
    root.forest.forEach((child: TreeNode) =>
      destructivelyAppendChildren(child, createNodes)
    )
  }
}

/**
 *
 * @param formulas an array of of formulas.
 */
export const parsePremises = (
  formulas: string[],
  parentId: string,
  row: number
): TreeNode => {
  const id = `${parentId}0`
  return makeNode({
    formulas,
    rule: 'A',
    forest: [],
    id,
    row,
  })
}

const makeTreeForm = (value = '', row: number): TreeForm => ({
  value,
  row,
  resolved: false,
})

export const updateNode = (
  root: TreeNode,
  targetNodeId: string,
  updater: NodeUpdater
): TreeNode => {
  if (root.id === targetNodeId) {
    return updater({ ...root })
  } else if (typeof root.forest === 'string') {
    return root
  } else {
    return {
      ...root,
      forest: root.forest.map((child) =>
        updateNode(child, targetNodeId, updater)
      ),
    }
  }
}

export const mutateNode = (
  root: TreeNode,
  targetNodeId: string,
  mutater: NodeMutater
): void => {
  if (root.id === targetNodeId) {
    mutater(root)
  } else if (Array.isArray(root.forest)) {
    root.forest.forEach((child) => mutateNode(child, targetNodeId, mutater))
  }
}

export const isOpenLeaf = (node: TreeNode | null): node is OpenLeafNode =>
  node != null && Array.isArray(node.forest) && node.forest.length === 0

export const isFinishedLeaf = (
  node: TreeNode | null
): node is FinishedLeafNode => node != null && node.forest === 'finished'

export const isContradictionLeaf = (
  node: TreeNode | null
): node is ClosedLeafNode => node != null && node.forest === 'contradiction'

export const isClosedLeaf = (node: TreeNode) =>
  isFinishedLeaf(node) || isContradictionLeaf(node)

export const lastRow = (node: TreeNode) => lastEl(node.formulas).row

export const firstRow = (node: TreeNode) => node.formulas[0].row
