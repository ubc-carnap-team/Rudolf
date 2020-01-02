import { Menu, MenuItem } from '@material-ui/core'
import React, { FC } from 'react'

import {
  CustomDispatch,
  resolveFormula,
  continueBranch,
  splitBranch,
  markContradiction,
  markFinished,
  reopenBranch,
} from '../RudolfReducer'
import { TreeForm } from '../typings/CarnapAPI'
import { TreeNode } from '../typings/TreeState'
import { isOpenLeaf, isClosedLeaf } from '../util/nodes'

type Props = {
  onClose: () => void
  open: boolean
  index: number
  node: TreeNode
  anchorEl: Element
  dispatch: CustomDispatch
  formula: TreeForm
}

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
          dispatch(continueBranch(node.id))
          close()
        }}
      >
        Continue Branch
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch(splitBranch(node.id))
          close()
        }}
      >
        Split Branch
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch(resolveFormula(node.id, index))
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
            markFinished(node.id)
            close()
          }}
        >
          Mark Branch Finished
        </MenuItem>
      )}
      {isClosedLeaf(node) && (
        <MenuItem
          onClick={() => {
            reopenBranch(node.id)
            close()
          }}
        >
          Reopen Branch
        </MenuItem>
      )}
    </Menu>
  )
}
