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
  makeFormulas,
} from './util/nodes'
import { TreeNode } from './typings/TreeState'

export type RudolfStore = {
  tree: TreeNode
  nextRow: number
}

export class RudolfReducer extends ImmerReducer<RudolfStore> {
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

  continueBranch(nodeId: string, formulaCount: number) {
    mutateNode(this.draftState.tree, nodeId, (node) =>
      destructivelyAppendChildren(node, (id) => [
        makeNode({
          id: `${id}0`,
          row: this.draftState.nextRow,
          formulas: makeFormulas(formulaCount, this.draftState.nextRow),
        }),
      ])
    )
    this.draftState.nextRow += formulaCount
  }

  splitBranch(nodeId: string, formulaCount: number) {
    mutateNode(this.draftState.tree, nodeId, (node) =>
      destructivelyAppendChildren(node, (id) => [
        makeNode({
          id: `${id}0`,
          row: this.draftState.nextRow,
          formulas: makeFormulas(formulaCount, this.draftState.nextRow),
        }),
        makeNode({
          id: `${id}1`,
          row: this.draftState.nextRow,
          formulas: makeFormulas(formulaCount, this.draftState.nextRow),
        }),
      ])
    )
    this.draftState.nextRow += formulaCount
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
  nextRow: premiseArray.length + 1,
}

export const rudolfReducer = createReducerFunction(RudolfReducer)
export const {
  createTree,
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
