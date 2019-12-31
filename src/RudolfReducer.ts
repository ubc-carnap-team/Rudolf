import {
  Actions,
  createActionCreators,
  createReducerFunction,
  ImmerReducer,
} from 'immer-reducer'
import { Dispatch } from 'react'
import { produce } from 'immer'
import { updateNode, mutateNode, parsePremises } from './util/nodes'
import { NodeUpdater, TreeNode } from './typings/TreeState'

export type RudolfStore = {
  tree: TreeNode
  nextRow: number
}

export class RudolfReducer extends ImmerReducer<RudolfStore> {
  updateTree(updater: NodeUpdater) {
    this.draftState.tree = updater(this.draftState.tree)
  }

  updateAtNode(nodeId: string, updater: NodeUpdater) {
    this.draftState.tree = updateNode(this.draftState.tree, nodeId, updater)
  }

  updateFormula(nodeId: string, formulaIndex: number, newValue: string) {
    this.draftState.tree = updateNode(this.draftState.tree, nodeId, (node) =>
      produce(node, (draftNode) => {
        draftNode.formulas[formulaIndex].value = newValue
      })
    )
  }

  updateRule(nodeId: string, newValue: string) {
    this.draftState.tree = updateNode(this.draftState.tree, nodeId, (node) =>
      produce(node, (draftNode) => {
        draftNode.rule = newValue
      })
    )
  }

  resolveFormula(nodeId: string, index: number) {
    mutateNode(this.draftState.tree, nodeId, (node) => {
      node.formulas[index].resolved = !node.formulas[index].resolved
    })
  }

  setTree(premiseArray: string[]) {
    this.draftState.tree = parsePremises(premiseArray, '', 1)
    this.draftState.nextRow = premiseArray.length
  }
}

export const initialPremises = 'P->Q,P,~Q'

export const initialState: RudolfStore = {
  tree: parsePremises(initialPremises.split(','), '', 1),
  nextRow: 1,
}

export const rudolfReducer = createReducerFunction(RudolfReducer)
export const {
  setTree,
  updateTree,
  updateAtNode,
  resolveFormula,
  updateFormula,
  updateRule,
} = createActionCreators(RudolfReducer)
export type RudolfAction = Actions<typeof RudolfReducer>
export type CustomDispatch = Dispatch<RudolfAction>
