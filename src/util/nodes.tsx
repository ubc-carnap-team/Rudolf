import { TreeNode } from '../typings/TreeNode'

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
  formula: string,
  children: TreeNode[] = []
): TreeNode => ({
  formula: formula,
  children: children,
  resolved: false,
})

/**
 *
 * @param root The root of a subTree
 * @param newNodes nodes to append, as-is, to the bottom of all open branches.
 */
const appendChildren = (
  root: TreeNode,
  createNodes: () => TreeNode[]
): TreeNode =>
  root.children.length === 0
    ? { ...root, children: createNodes() }
    : {
        ...root,
        children: root.children.map<TreeNode>((child: TreeNode) =>
          appendChildren(child, createNodes)
        ),
      }
/**
 *
 * @param root - The node to mark as resolved.
 * Mark the currently selected node as resolved.
 */
const markResolved = (root: TreeNode) => ({ ...root, resolved: true })

/**
 *
 * @param formulas a comma-separated list of formulas, as a string.
 */
const parseBranch = (inputString: string): TreeNode | null => {
  const formulas = inputString.split(',').filter((formula) => formula) // filter out empty strings.
  if (formulas.length) {
    return formulas
      .map((formula: string) => makeNode(formula))
      .reduceRight((prev: TreeNode, curr: TreeNode) => ({
        ...curr,
        children: [prev],
      }))
  } else {
    return null
  }
}

const getNodeGenerator = ([leftBranchInput, rightBranchInput]: [
  string,
  string
]) => () => {
  const leftBranch: () => TreeNode | null = () => parseBranch(leftBranchInput)
  const rightBranch: () => TreeNode | null = () => parseBranch(rightBranchInput)
  while (true) {
    const newNodes = [leftBranch(), rightBranch()].filter(
      (maybeNode: TreeNode | null): maybeNode is TreeNode => maybeNode != null
    )
    return newNodes
  }
}
const resolveSelectedNode = (
  root: TreeNode,
  selectedNode: TreeNode,
  createNodes: () => TreeNode[]
): TreeNode => {
  return root === selectedNode
    ? appendChildren(markResolved(selectedNode), createNodes)
    : {
        ...root,
        children: root.children.map((child) =>
          resolveSelectedNode(child, selectedNode, createNodes)
        ),
      }
}
