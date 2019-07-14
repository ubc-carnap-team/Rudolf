import { Formula } from '../typings/Formula'
import { TreeNode } from '../typings/TruthTree'
import { parseFormula, printTerm } from './formulas'

export const decomposeNode = (
  root: TreeNode,
  selectedNode: TreeNode,
  strategy: string,
  newNodes: TreeNode[]
): TreeNode =>
  root === selectedNode
    ? appendChildren(markResolved(selectedNode), newNodes)
    : {
        ...root,
        children: root.children.map((child) =>
          decomposeNode(child, selectedNode, strategy, newNodes)
        ),
      }

export const makeNode = (
  term: Formula,
  children: TreeNode[] = []
): TreeNode => ({
  term: term,
  name: printTerm(term),
  children: children,
  resolved: false,
})

export const appendChildren = (
  root: TreeNode,
  newNodes: TreeNode[]
): TreeNode =>
  root.children.length === 0
    ? { ...root, children: newNodes }
    : {
        ...root,
        children: root.children.map<TreeNode>((child: TreeNode) =>
          appendChildren(child, newNodes)
        ),
      }
export const markResolved = (root: TreeNode) => ({ ...root, resolved: true })

// TODO: stub
export const parseNodes = (asString: string) =>
  asString.split(',').map((formula: string) => makeNode(parseFormula(formula)))
