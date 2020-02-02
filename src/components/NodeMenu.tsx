import { Menu, MenuItem } from '@material-ui/core'
import React, { FC } from 'react'

import {
  CustomDispatch,
  toggleResolved,
  continueBranch,
  splitBranch,
  markContradiction,
  markFinished,
  reopenBranch,
} from '../RudolfReducer'
import { TreeForm } from '../typings/TreeState'
import { TreeNode } from '../typings/TreeState'
import { isOpenLeaf } from '../util/nodes'

type Props = {
  onClose: () => void
  open: boolean
  index: number
  node: TreeNode
  anchorEl: Element
  dispatch: CustomDispatch
  formula: TreeForm
}

/**
 * @TODO make context menu work for each of
 * - Formula Node:
 *   - branch commands
 *
 * - Contradiction/Finished node:
 *   - Reopen.
 * - Formula:
 *   - branch commands
 *   - (un)resolve
 *   - close branch.
 */

export const NodeMenu: FC<Props> = ({
  open,
  dispatch,
  index,
  anchorEl,
  formula,
  onClose: close,
  node,
}) => {
  return (
    <Menu open={open} anchorEl={anchorEl} onClose={close}>
      <MenuItem
        onClick={() => {
          dispatch(continueBranch(node.id, 1))
          close()
        }}
      >
        Continue Branch w/ 1 formula
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch(splitBranch(node.id, 1))
          close()
        }}
      >
        Split Branch w/ 1 formula
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch(continueBranch(node.id, 2))
          close()
        }}
      >
        Continue Branch w/ 2 formulas
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch(splitBranch(node.id, 2))
          close()
        }}
      >
        Split Branch w/ 2 formulas
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch(toggleResolved(node.id, index))
          close()
        }}
      >
        Mark as {formula.resolved ? 'Un' : ''}Resolved
      </MenuItem>
      {isOpenLeaf(node) && (
        <MenuItem
          onClick={() => {
            dispatch(markContradiction(node.id))
            close()
          }}
        >
          Close Branch With Contradiction
        </MenuItem>
      )}
      {isOpenLeaf(node) && (
        <MenuItem
          onClick={() => {
            dispatch(markFinished(node.id))
            close()
          }}
        >
          Mark Branch Finished
        </MenuItem>
      )}
      {node.nodeType === 'contradiction' && (
        <MenuItem
          onClick={() => {
            dispatch(reopenBranch(node.id))
            close()
          }}
        >
          Reopen Branch
        </MenuItem>
      )}
    </Menu>
  )
}
