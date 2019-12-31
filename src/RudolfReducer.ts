import {
  Actions,
  createActionCreators,
  createReducerFunction,
  ImmerReducer,
} from 'immer-reducer'
import { Dispatch } from 'react'
import { produce } from 'immer'
import {
  updateNode,
  mutateNode,
  parsePremises,
  appendChildren,
  makeNode,
} from './util/nodes'
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

  createTree(premiseArray: string[]) {
    this.draftState.tree = parsePremises(premiseArray, '', 1)
    this.draftState.nextRow = premiseArray.length
  }

  // TODO: handle multiple formulas
  continueBranch(nodeId: string) {
    this.draftState.tree = updateNode(this.draftState.tree, nodeId, (node) =>
      appendChildren(node, (id) => [
        makeNode({ id: `${id}0`, row: this.draftState.nextRow }),
      ])
    )
  }
}

export const initialPremises = 'P->Q,P,~Q'

export const initialState: RudolfStore = {
  tree: parsePremises(initialPremises.split(','), '', 1),
  nextRow: 1,
}

export const rudolfReducer = createReducerFunction(RudolfReducer)
export const {
  createTree,
  updateTree,
  updateAtNode,
  resolveFormula,
  updateFormula,
  updateRule,
  continueBranch,
} = createActionCreators(RudolfReducer)
export type RudolfAction = Actions<typeof RudolfReducer>
export type CustomDispatch = Dispatch<RudolfAction>
