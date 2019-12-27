import {
  OpenLeafNode,
  NodeGenerator,
  NodeUpdater,
  TreeNode,
  ClosedLeafNode,
  FinishedLeafNode,
} from '../typings/TreeState'
import { TreeForm } from '../typings/CarnapAPI'

export const makeNode = ({
  formulas = [],
  forest = [],
  rule = '',
  id,
  row = 0,
}: Omit<Partial<TreeNode>, 'formulas'> & {
  id: string
  row: number
  formulas?: string[]
}): TreeNode => ({
  formulas: formulas.map((form, index) => makeTreeForm(form, index + row)),
  forest,
  closed: false,
  rule,
  id,
})

/**
 *
 * @param root The root of a subTree
 * @param newNodes nodes to append, as-is, to the bottom of all open branches.
 */
export const appendChildren = (
  root: TreeNode,
  createNodes: NodeGenerator
): TreeNode => {
  if (typeof root.forest === 'string') {
    return root
  } else if (root.forest.length === 0) {
    return root.closed ? root : { ...root, forest: createNodes(root.id, -1) } // TODO
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
    forest: formulas.length > 1 ? [] : [],
    id,
    row,
  })
}

const makeTreeForm = (value = '', row: number): TreeForm => ({
  value,
  row,
  resolved: false,
})

// TODO: delete if unused
// const makeBranch = (
//   formulas: string[],
//   parentId: string,
//   parentRow: number
// ): TreeNode => {
//   const id = `${parentId}0`
//   const row = parentRow + 1
//   return makeNode({
//     formulas: formulas.map(makeTreeForm),
//     forest: [],
//     id,
//     row,
//   })
// }

// TODO: delete if unused.
// const getNodeGenerator = ([leftBranchInput, rightBranchInput]: [
//   string,
//   string
// ]) => (parentId: string, parentRow: number) => {
//   const leftBranch = makeBranch(leftBranchInput.split(','), parentId, parentRow)
//   const rightBranch = makeBranch(
//     rightBranchInput.split(','),
//     parentId,
//     parentRow
//   )
//   return [leftBranch, rightBranch].filter(
//     (maybeNode: TreeNode | null): maybeNode is TreeNode => maybeNode != null
//   )
// }

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
