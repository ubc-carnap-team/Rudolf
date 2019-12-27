import { Menu, MenuItem } from '@material-ui/core'
import React, { FC } from 'react'

import { NodeUpdater, TreeNode } from '../typings/TreeState'
import {
  appendChildren,
  isOpenLeaf,
  makeNode,
  isClosedLeaf,
} from '../util/nodes'
import { CustomDispatch, updateTree, incrementRow } from '../RudolfReducer'

type Props = {
  node: TreeNode
  onClose: () => void
  open: boolean
  anchorEl: Element
  nextRow: number
  dispatch: CustomDispatch
}

export const NodeMenu: FC<Props> = ({
  open,
  node,
  dispatch,
  anchorEl,
  onClose: close,
  nextRow,
}) => {
  const update = (updater: NodeUpdater) => {
    dispatch(updateTree(updater))
    close()
  }

  const continueBranchUpdater: NodeUpdater = (node) =>
    appendChildren(node, (id) => [makeNode({ id: `${id}0`, row: nextRow })])

  const splitBranchUpdater: NodeUpdater = (node) =>
    appendChildren(node, (id) => [
      makeNode({
        id: `${id}0`,
        row: nextRow,
      }),
      makeNode({
        id: `${id}1`,
        row: nextRow,
      }),
    ])

  const handleSplit = (): void => {
    dispatch(incrementRow())
    update(splitBranchUpdater)
  }

  const handleContinue = (): void => {
    dispatch(incrementRow())
    update(continueBranchUpdater)
  }

  // TODO
  const toggleResolved = (): void =>
    update((node) => ({
      ...node,
      resolved: !(node as any).resolved,
    }))

  const markContradiction = (): void =>
    update((node) => ({
      ...node,
      forest: 'contradiction',
    }))

  const markFinished = (): void =>
    update((node) => ({
      ...node,
      forest: 'finished',
    }))
  const reopenBranch = (): void =>
    update((node) => ({
      ...node,
      forest: [],
    }))

  return (
    <Menu open={open} anchorEl={anchorEl} onClose={close}>
      <MenuItem onClick={handleContinue}>Continue Branch</MenuItem>
      <MenuItem onClick={handleSplit}>Split Branch</MenuItem>
      <MenuItem onClick={toggleResolved}>
        {/* Mark as {node.resolved ? 'Un' : ''}Resolved */}
      </MenuItem>
      {isOpenLeaf(node) && (
        <MenuItem onClick={markContradiction}>
          Close Branch With Contradiction
        </MenuItem>
      )}
      {isOpenLeaf(node) && (
        <MenuItem onClick={markFinished}>Mark Branch Finished</MenuItem>
      )}
      {isClosedLeaf(node) && (
        <MenuItem onClick={reopenBranch}>Reopen Branch</MenuItem>
      )}
    </Menu>
  )
}
