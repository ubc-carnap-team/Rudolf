import {
  Actions,
  createActionCreators,
  createReducerFunction,
  ImmerReducer,
} from 'immer-reducer'
import { Dispatch } from 'react'

import { updateNode } from './util/nodes'
import { NodeUpdater, TreeNode } from './typings/TreeState'

export type RudolfStore = {
  tree: TreeNode
  nextRow: number
}

export class RudolfReducer extends ImmerReducer<RudolfStore> {
  updateTree(updater: NodeUpdater) {
    this.draftState.tree = updater(this.draftState.tree)
  }

  updateAtNode(id: string, updater: NodeUpdater) {
    this.draftState.tree = updateNode(this.draftState.tree, id, updater)
  }

  // TODO: formula updates
  // updateFormula(id: string, formula: string) {
  //   this.updateNode(this.draftState.tree, id, () => formula
  // }

  // TODO: rule updates
  // updateRule(id: string, rule: string) {
  //   this.draftState.nodeRules[id] = rule
  // }

  incrementRow() {
    this.draftState.nextRow += 1
  }

  setRow(row: number) {
    this.draftState.nextRow = row
  }

  setTree(tree: TreeNode) {
    this.draftState.tree = tree
  }
}

export const initialState: RudolfStore = {
  tree: { forest: [], formulas: [], closed: false, rule: '', id: '' },
  nextRow: 1,
}

export const rudolfReducer = createReducerFunction(RudolfReducer)
export const {
  setRow,
  setTree,
  incrementRow,
  updateTree,
  updateAtNode,
} = createActionCreators(RudolfReducer)
export type RudolfAction = Actions<typeof RudolfReducer>
export type CustomDispatch = Dispatch<RudolfAction>
