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
  destructivelyAppendChildren,
  makeNode,
} from './util/nodes'
import { NodeUpdater, TreeNode } from './typings/TreeState'

export type RudolfStore = {
  tree: TreeNode
  nextRow: number
}

export class RudolfReducer extends ImmerReducer<RudolfStore> {
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
  // TODO: rows aren't updating correctly.
  continueBranch(nodeId: string) {
    this.draftState.nextRow++
    mutateNode(this.draftState.tree, nodeId, (node) =>
      destructivelyAppendChildren(node, (id) => [
        makeNode({ id: `${id}0`, row: this.draftState.nextRow }),
      ])
    )
  }

  // TODO: handle multiple formulas
  splitBranch(nodeId: string) {
    this.draftState.nextRow++
    mutateNode(this.draftState.tree, nodeId, (node) =>
      destructivelyAppendChildren(node, (id) => [
        makeNode({
          id: `${id}0`,
          row: this.draftState.nextRow,
        }),
        makeNode({
          id: `${id}1`,
          row: this.draftState.nextRow,
        }),
      ])
    )
  }

  markContradiction(nodeId: string) {
    mutateNode(this.draftState.tree, nodeId, (node) => {
      node.forest = 'contradiction'
    })
  }
  markFinished(nodeId: string) {
    mutateNode(this.draftState.tree, nodeId, (node) => {
      node.forest = 'finished'
    })
  }

  reopenBranch(nodeId: string) {
    mutateNode(this.draftState.tree, nodeId, (node) => {
      node.forest = []
    })
  }
}

export const initialPremises = 'P->Q,P,~Q'
const premiseArray = initialPremises.split(',')

export const initialState: RudolfStore = {
  tree: parsePremises(premiseArray, '', 1),
  nextRow: premiseArray.length,
}

export const rudolfReducer = createReducerFunction(RudolfReducer)
export const {
  createTree,
  updateAtNode,
  resolveFormula,
  updateFormula,
  updateRule,
  continueBranch,
  splitBranch,
  markContradiction,
  markFinished,
  reopenBranch,
} = createActionCreators(RudolfReducer)
export type RudolfAction = Actions<typeof RudolfReducer>
export type CustomDispatch = Dispatch<RudolfAction>
