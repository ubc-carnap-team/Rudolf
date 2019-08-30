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
  formula: string,
  children: TreeNode[] = []
): TreeNode => ({
  formula: formula,
  children: children,
  resolved: false,
  closed: false,
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
  if (root.children.length === 0) {
    return root.closed ? root : { ...root, children: createNodes() }
  } else {
    return {
      ...root,
      children: root.children.map<TreeNode>((child: TreeNode) =>
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
 * @param formulas a comma-separated list of formulas, as a string.
 */
export const parseBranch = (inputString: string): TreeNode | null => {
  const replacedInput = replaceSymbols(inputString)

  const formulas = replacedInput.split(',').filter((formula) => formula) // filter out empty strings from 'final'

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

const replaceSymbols = (inputString: string): string => {
  // const singleArrow = inputString.replace('->', '⊃') // replace -> with proper hook symbol
  // const doubleArrow = singleArrow.replace('=>', '⊃') // replace => with proper hook symbol
  // const cond = doubleArrow.replace('>', '⊃') // replace > with proper hook symbol
  // const negation = cond.replace('~', '¬') // replace ~ with proper negation symbol
  // const dash = negation.replace('-', '¬') // replace - with proper negation symbol
  // const conjunction = dash.replace('^', '&') // replace ^ with proper conjunction symbol
  // const disjunction = conjunction.replace('v', '∨') // replace v with proper disjunction symbol
  // const final = disjunction.replace('=', '≡') // replace = with proper biconditional symbol

  const initialValue = inputString

  const symbols = {
    '->': '⊃',
    '=>': '⊃',
    '>': '⊃',
    '~': '¬',
    '-': '¬',
    '^': '&',
    '=': '≡',
    v: '∨',
    '/': '∨',
  }

  const newInput = Object.entries(symbols).reduce(reducer, initialValue)
  return newInput
}

const reducer = (
  inputString: string,
  [inside, out]: [string, string]
): string => {
  const newString = inputString.replace(inside, out)
  return newString
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
        children: root.children.map((child) =>
          updateNode(child, selectedNode, updater)
        ),
      }

export const isLeaf = (node: TreeNode | null): node is LeafNode =>
  node != null && node.children.length === 0
