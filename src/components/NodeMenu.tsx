import { Menu, MenuItem } from '@material-ui/core'
import React, { FC } from 'react'

import { CustomDispatch, incrementRow, updateTree } from '../RudolfReducer'
import { NodeUpdater } from '../typings/TreeState'
import {
  appendChildren,
  isClosedLeaf,
  isOpenLeaf,
  makeNode,
} from '../util/nodes'

type Props = {
  onClose: () => void
  open: boolean
  nodeId: string
  index: number
  anchorEl: Element
  dispatch: CustomDispatch
}

export const NodeMenu: FC<Props> = ({
  open,
  dispatch,
  nodeId,
  index,
  anchorEl,
  onClose: close,
}) => {
  const update = (updater: NodeUpdater) => {
    dispatch(updateTree(updater))
    close()
  }

  // TODO: convert to reducer action
  // const continueBranchUpdater: NodeUpdater = (node) =>
  //   appendChildren(node, (id) => [makeNode({ id: `${id}0`, row: nextRow })])

  // TODO: convert to reducer action
  // const splitBranchUpdater: NodeUpdater = (node) =>
  //   appendChildren(node, (id) => [
  //     makeNode({
  //       id: `${id}0`,
  //       row: nextRow,
  //     }),
  //     makeNode({
  //       id: `${id}1`,
  //       row: nextRow,
  //     }),
  //   ])

  // TODO: convert to reducer action
  // const handleSplit = (): void => {
  //   dispatch(incrementRow())
  //   update(splitBranchUpdater)
  // }

  // TODO: convert to reducer action
  // const handleContinue = (): void => {
  //   dispatch(incrementRow())
  //   update(continueBranchUpdater)
  // }

  // TODO: convert to reducer action
  const toggleResolved = (): void =>
    update((node) => ({
      ...node,
      resolved: !(node as any).resolved,
    }))

  // TODO: convert to reducer action
  // const markContradiction = (): void =>
  //   update((node) => ({
  //     ...node,
  //     forest: 'contradiction',
  //   }))

  // TODO: convert to reducer action
  // const markFinished = (): void =>
  //   update((node) => ({
  //     ...node,
  //     forest: 'finished',
  //   }))
  // TODO: convert to reducer action
  // const reopenBranch = (): void =>
  //   update((node) => ({
  //     ...node,
  //     forest: [],
  //   }))

  return (
    <Menu open={open} anchorEl={anchorEl} onClose={close}>
      <MenuItem
      // onClick={handleContinue}
      >
        Continue Branch
      </MenuItem>
      <MenuItem
      // onClick={handleSplit}
      >
        Split Branch
      </MenuItem>
      <MenuItem onClick={toggleResolved}>
        {/* Mark as {node.resolved ? 'Un' : ''}Resolved */}
      </MenuItem>
      // TODO
      {/* {isOpenLeaf(node) && (
        <MenuItem onClick={markContradiction}>
          Close Branch With Contradiction
        </MenuItem>
      )} */}
      // TODO
      {/* {isOpenLeaf(node) && (
        <MenuItem onClick={markFinished}>Mark Branch Finished</MenuItem>
      )} */}
      // TODO
      {/* {isClosedLeaf(node) && (
        <MenuItem onClick={reopenBranch}>Reopen Branch</MenuItem>
      )} */}
    </Menu>
  )
}
