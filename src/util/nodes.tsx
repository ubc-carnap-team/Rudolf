import { LeafNode, ReactD3TreeItem } from '../typings/TreeNode'

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
  root: ReactD3TreeItem,
  selectedNode: ReactD3TreeItem,
  nodeInput: [string, string]
): ReactD3TreeItem => {
  const createNodes = getNodeGenerator(nodeInput)
  return resolveSelectedNode(root, selectedNode, createNodes)
}

export const makeNode = (
  formula: string,
  children: ReactD3TreeItem[] = []
): ReactD3TreeItem => ({
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
  root: ReactD3TreeItem,
  createNodes: () => ReactD3TreeItem[]
): ReactD3TreeItem => {
  if (root.children.length === 0) {
    return root.closed ? root : { ...root, children: createNodes() }
  } else {
    return {
      ...root,
      children: root.children.map<ReactD3TreeItem>((child: ReactD3TreeItem) =>
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
const markResolved = (root: ReactD3TreeItem) => ({ ...root, resolved: true })

/**
 *
 * @param formulas a comma-separated list of formulas, as a string.
 */
export const parseBranch = (inputString: string): ReactD3TreeItem | null => {
  const formulas = inputString.split(',').filter((formula) => formula) // filter out empty strings.
  if (formulas.length) {
    return formulas
      .map((formula: string) => makeNode(formula))
      .reduceRight((prev: ReactD3TreeItem, curr: ReactD3TreeItem) => ({
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
  const leftBranch: () => ReactD3TreeItem | null = () => parseBranch(leftBranchInput)
  const rightBranch: () => ReactD3TreeItem | null = () => parseBranch(rightBranchInput)
  const newNodes = [leftBranch(), rightBranch()].filter(
    (maybeNode: ReactD3TreeItem | null): maybeNode is ReactD3TreeItem => maybeNode != null
  )
  return newNodes
}
const resolveSelectedNode = (
  root: ReactD3TreeItem,
  selectedNode: ReactD3TreeItem,
  createNodes: () => ReactD3TreeItem[]
): ReactD3TreeItem =>
  updateNode(root, selectedNode, (node) =>
    appendChildren(markResolved(node), createNodes)
  )

export const updateNode = <Updater extends (node: ReactD3TreeItem) => ReactD3TreeItem>(
  root: ReactD3TreeItem,
  selectedNode: ReactD3TreeItem,
  updater: Updater
): ReactD3TreeItem =>
  root === selectedNode
    ? updater({ ...root })
    : {
      ...root,
      children: root.children.map((child) =>
        updateNode(child, selectedNode, updater)
      ),
    }

export const isLeaf = (node: ReactD3TreeItem | null): node is LeafNode =>
  node != null && node.children.length === 0
