import React, { FC } from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import { TreeNode, NodeUpdater } from '../typings/TreeNode'
import { appendChildren, makeNode, isLeaf } from '../util/nodes'

type Props = {
  node: TreeNode
  onClose: () => void
  updateTree: (node: TreeNode, updater: NodeUpdater) => void
  open: boolean
  anchorEl: Element
}

export const NodeMenu: FC<Props> = ({
  open,
  node,
  updateTree,
  anchorEl,
  onClose: close,
}) => {
  const update = (updater: NodeUpdater) => () => {
    updateTree(node, updater)
    close()
  }
  const continueBranch = update((node) =>
    appendChildren(node, () => [makeNode()])
  )

  const splitBranch = update((node) =>
    appendChildren(node, () => [makeNode(), makeNode()])
  )

  const resolveNode = update((node) => ({ ...node, resolved: true }))

  const closeBranch = update((node) => ({
    ...node,
    closed: true,
  }))

  return (
    <Menu open={open} anchorEl={anchorEl} onClose={close}>
      <MenuItem onClick={continueBranch}>Continue branch</MenuItem>
      <MenuItem onClick={splitBranch}>Split branch</MenuItem>
      <MenuItem onClick={resolveNode}>Resolve node</MenuItem>
      {isLeaf(node) && <MenuItem onClick={closeBranch}>Close Branch</MenuItem>}
    </Menu>
  )
}
