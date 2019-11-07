import { node } from 'prop-types'

import { LeafNode, NodeGenerator, NodeUpdater, TreeNode } from '../typings/TreeNode'

/**
 *
 * @param root
 * @param selectedNode
 * @param newNodes
 * 1. Mark the currently selected node as resolved.
 * 2. Append the new nodes to the bottom of all open branches.
 *  (For now, this can just be all branches, since we don't have
 *  a way of marking branches as open/closed yet.)
 */
export const decomposeNode = (
  root: TreeNode,
  selectedNode: TreeNode,
  nodeInput: [string, string]
): TreeNode => {
  const createNodes = getNodeGenerator(nodeInput)
  return resolveSelectedNode(root, selectedNode, createNodes)
}

export const makeNode = ({
  label = '',
  forest = [],
  rule = '',
  id,
  row,
}: Partial<TreeNode> & {
  id: string
  row: number
}): TreeNode => ({
  label,
  forest,
  resolved: false,
  closed: false,
  rule,
  id,
  row,
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
  if (root.forest.length === 0) {
    return root.closed
      ? root
      : { ...root, forest: createNodes(root.id, root.row) }
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
 * @param root - The node to mark as resolved.
 * Mark the currently selected node as resolved.
 */
const markResolved = (root: TreeNode) => ({ ...root, resolved: true })

/**
 *
 * @param formulas an array of of formulas.
 */
export const parsePremises = (
  formulas: string[],
  parentId = '',
  parentRow = 0
): TreeNode => {
  const id = `${parentId}0`
  const row = parentRow + 1
  return makeNode({
    label: formulas[0],
    rule: 'A',
    forest:
      formulas.length > 1 ? [parsePremises(formulas.slice(1), id, row)] : [],
    id,
    row,
  })
}

export const countPremises = (formulas: string[], count = 0): number => {
  count = formulas.length
  return count
}

const makeBranch = (
  formulas: string[],
  parentId: string,
  parentRow: number
): TreeNode => {
  const id = `${parentId}0`
  const row = parentRow + 1
  return makeNode({
    label: formulas[0],
    forest: [makeBranch(formulas.slice(1), id, row)],
    id,
    row,
  })
}

const getNodeGenerator = ([leftBranchInput, rightBranchInput]: [
  string,
  string
]) => (parentId: string, parentRow: number) => {
  const leftBranch = makeBranch(leftBranchInput.split(','), parentId, parentRow)
  const rightBranch = makeBranch(
    rightBranchInput.split(','),
    parentId,
    parentRow
  )
  return [leftBranch, rightBranch].filter(
    (maybeNode: TreeNode | null): maybeNode is TreeNode => maybeNode != null
  )
}
const resolveSelectedNode = (
  root: TreeNode,
  selectedNode: TreeNode,
  createNodes: NodeGenerator
): TreeNode =>
  updateNode(root, selectedNode, (node) =>
    appendChildren(markResolved(node), createNodes)
  )

export const updateNode = (
  root: TreeNode,
  selectedNode: TreeNode,
  updater: NodeUpdater
): TreeNode =>
  root === selectedNode
    ? updater({ ...root })
    : {
        ...root,
        forest: root.forest.map((child) =>
          updateNode(child, selectedNode, updater)
        ),
      }

export const isLeaf = (node: TreeNode | null): node is LeafNode =>
  node != null && node.forest.length === 0
