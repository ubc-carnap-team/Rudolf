import React, { FC } from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import { TreeNode, NodeUpdater } from '../typings/TreeNode'
import { appendChildren, makeNode } from '../util/nodes'

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
  onClose,
}) => {
  const continueBranch = () => {
    updateTree(node, (node) => appendChildren(node, () => [makeNode()]))
    onClose()
  }
  const splitBranch = () => {
    updateTree(node, (node) =>
      appendChildren(node, () => [makeNode(), makeNode()])
    )
    onClose()
  }
  return (
    <Menu open={open} anchorEl={anchorEl} onClose={onClose}>
      <MenuItem onClick={continueBranch}>Continue branch.</MenuItem>
      <MenuItem onClick={splitBranch}>Split branch.</MenuItem>
    </Menu>
  )
}
