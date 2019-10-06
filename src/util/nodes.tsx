import { LeafNode, TreeNode } from '../typings/TreeNode'

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

export const makeNode = (
  label = '',
  forest: TreeNode[] = [],
  rule = ''
): TreeNode => ({
  label,
  forest,
  resolved: false,
  closed: false,
  rule,
})

/**
 *
 * @param root The root of a subTree
 * @param newNodes nodes to append, as-is, to the bottom of all open branches.
 */
const appendChildren = (
  root: TreeNode,
  createNodes: () => TreeNode[]
): TreeNode => {
  if (root.forest.length === 0) {
    return root.closed ? root : { ...root, forest: createNodes() }
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
 * @param inputString a comma-separated list of formulas, as a string.
 */
export const parseBranch = (inputString: string): TreeNode => {
  const formulas = inputString.split(',')
  return formulas
    .map((formula: string) => makeNode(formula))
    .reduceRight((prev: TreeNode, curr: TreeNode) => ({
      ...curr,
      forest: [prev],
    }))
}

/**
 *
 * @param formulas an array of of formulas.
 */
export const parsePremises = (formulas: string[]): TreeNode => {
  return formulas
    .map((formula: string) => makeNode(formula, [], 'Ass'))
    .reduceRight((prev: TreeNode, curr: TreeNode) => ({
      ...curr,
      forest: [prev],
    }))
}

const getNodeGenerator = ([leftBranchInput, rightBranchInput]: [
  string,
  string
]) => () => {
  const leftBranch: () => TreeNode | null = () => parseBranch(leftBranchInput)
  const rightBranch: () => TreeNode | null = () => parseBranch(rightBranchInput)
  const newNodes = [leftBranch(), rightBranch()].filter(
    (maybeNode: TreeNode | null): maybeNode is TreeNode => maybeNode != null
  )
  return newNodes
}
const resolveSelectedNode = (
  root: TreeNode,
  selectedNode: TreeNode,
  createNodes: () => TreeNode[]
): TreeNode =>
  updateNode(root, selectedNode, (node) =>
    appendChildren(markResolved(node), createNodes)
  )

export const updateNode = <Updater extends (node: TreeNode) => TreeNode>(
  root: TreeNode,
  selectedNode: TreeNode,
  updater: Updater
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
