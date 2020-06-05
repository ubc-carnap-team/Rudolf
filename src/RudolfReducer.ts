import {
  Actions,
  createActionCreators,
  createReducerFunction,
  ImmerReducer,
} from 'immer-reducer'
import { Dispatch } from 'react'

import { FormulaNode } from './typings/TreeState'
import {
  destructivelyAppendChildren,
  findresolvedRows,
  getNode,
  makeContradictionNode,
  makeEmptyFormulas,
  makeFinishedNode,
  makeNode,
  parsePremises,
} from './util/nodes'

export type RudolfStore = {
  tree: FormulaNode
  nextRow: number
}

export class RudolfReducer extends ImmerReducer<RudolfStore> {
  updateFormula(nodeId: string, formulaIndex: number, newValue: string) {
    const draftNode = getNode(this.draftState.tree, nodeId)
    draftNode.formulas[formulaIndex].value = newValue
  }

  updateRule(nodeId: string, newValue: string) {
    const draftNode = getNode(this.draftState.tree, nodeId)
    draftNode.rule = newValue
  }

  updateParentRow(nodeId: string, newValue: string) {
    const draftNode = getNode(this.draftState.tree, nodeId)
    draftNode.parentRow = newValue
  }

  toggleResolved(nodeId: string, index: number) {
    const draftNode = getNode(this.draftState.tree, nodeId)
    draftNode.formulas[index].resolved = !draftNode.formulas[index].resolved
  }

  createTree(premiseArray: string[]) {
    this.draftState.tree = parsePremises(premiseArray)
    this.draftState.nextRow = premiseArray.length
  }

  continueBranch(nodeId: string, formulaCount: number) {
    const draftNode = getNode(this.draftState.tree, nodeId)
    destructivelyAppendChildren(draftNode, (id) => [
      makeNode({
        id: `${id}0`,
        formulas: makeEmptyFormulas(formulaCount, this.draftState.nextRow),
      }),
    ])

    this.draftState.nextRow += formulaCount
  }

  splitBranch(nodeId: string, formulaCount: number) {
    const draftNode = getNode(this.draftState.tree, nodeId)
    destructivelyAppendChildren(draftNode, (id) => {
      return [
        makeNode({
          id: `${id}0`,
          formulas: makeEmptyFormulas(formulaCount, this.draftState.nextRow),
        }),
        makeNode({
          id: `${id}1`,
          formulas: makeEmptyFormulas(formulaCount, this.draftState.nextRow),
        }),
      ]
    })
    this.draftState.nextRow += formulaCount
  }

  markContradiction(nodeId: string) {
    const draftNode = getNode(this.draftState.tree, nodeId) as FormulaNode
    draftNode.forest = [makeContradictionNode(draftNode.id)]
  }

  markFinished(nodeId: string) {
    const resolvedRows = findresolvedRows(this.draftState.tree, nodeId)
    const draftNode = getNode(this.draftState.tree, nodeId) as FormulaNode
    draftNode.forest = [makeFinishedNode(nodeId, resolvedRows)]
  }

  reopenBranch(nodeId: string) {
    const draftNode = getNode(this.draftState.tree, nodeId) as FormulaNode
    draftNode.forest = []
  }
}

export const initialPremises = 'P->Q,P,~Q'
const premiseArray = initialPremises.split(',')

export const initialState: RudolfStore = {
  tree: parsePremises(premiseArray),
  nextRow: premiseArray.length + 1,
}

export const rudolfReducer = createReducerFunction(RudolfReducer)
export const {
  createTree,
  toggleResolved,
  updateFormula,
  updateRule,
  continueBranch,
  splitBranch,
  markContradiction,
  markFinished,
  reopenBranch,
  updateParentRow,
} = createActionCreators(RudolfReducer)
export type RudolfAction = Actions<typeof RudolfReducer>
export type CustomDispatch = Dispatch<RudolfAction>
