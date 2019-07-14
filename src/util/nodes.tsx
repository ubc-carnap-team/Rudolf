import { TreeNode } from '../typings/TreeNode'

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
  formula: string,
  children: TreeNode[] = []
): TreeNode => ({
  formula: formula,
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

export const parseNodes = (asString: string) =>
  asString.split(',').map((formula: string) => makeNode(formula))
