import {
  Actions,
  createActionCreators,
  createReducerFunction,
  ImmerReducer,
  ImmerReducerFunction,
} from 'immer-reducer'
import { Dispatch } from 'react'

import {
  FormulaNode,
  Justification,
  JustificationMap,
} from './typings/TreeState'
import {
  destructivelyAppendChildren,
  getNode,
  makeContradictionNode,
  makeEmptyFormulas,
  makeFinishedNode,
  makeNode,
  parsePremises,
} from './util/nodes'

export interface RudolfStore {
  tree: FormulaNode
  nextRow: number
  justifications: JustificationMap
}

class RudolfReducerClass extends ImmerReducer<RudolfStore> {
  updateFormula(nodeId: string, formulaIndex: number, newValue: string) {
    const draftNode = getNode(this.draftState.tree, nodeId)
    draftNode.formulas[formulaIndex].value = newValue
  }

  updateJustification(nodeRow: number, justification: Partial<Justification>) {
    Object.assign(this.draftState.justifications[nodeRow], justification)
  }

  updateContradiction(id: string, contradictoryRows: string) {
    Object.assign(getNode(this.draftState.tree, id), { contradictoryRows })
  }

  toggleResolved(nodeId: string, index: number) {
    const draftNode = getNode(this.draftState.tree, nodeId)
    draftNode.formulas[index].resolved = !draftNode.formulas[index].resolved
  }

  createTree(premiseArray: string[]) {
    this.draftState.tree = parsePremises(premiseArray)
    this.draftState.nextRow = premiseArray.length + 1
    this.draftState.justifications = {}
  }

  // add a single node to the bottom of each open branch of the subtree
  // whose root is the targeted node
  // the id of each new node will be its parent node's id concatenated with '0'
  // formulaCount sets the number of empty formulas, usually 1 or 2.
  continueBranch(nodeId: string, formulaCount: number) {
    const draftNode = getNode(this.draftState.tree, nodeId)
    destructivelyAppendChildren(draftNode, (id) => [
      makeNode({
        id: `${id}0`,
        formulas: makeEmptyFormulas(formulaCount, this.draftState.nextRow),
      }),
    ])

    this.draftState.justifications[this.draftState.nextRow] = {
      rule: '',
      parentRow: '',
    }
    this.draftState.nextRow += formulaCount
  }

  // add two new branches to the bottom of each open branch of the subtree
  // whose root is the targeted node
  // the id of each new node will be its parent node's id concatenated with '0' (on the left) or '1' (on the right)
  // formulaCount sets the number of empty formulas, usually 1 or 2.
  splitBranch(nodeId: string, formulaCount: number) {
    const draftNode = getNode(this.draftState.tree, nodeId)
    destructivelyAppendChildren(draftNode, (id) => {
      const formulas = makeEmptyFormulas(formulaCount, this.draftState.nextRow)
      return [
        makeNode({
          id: `${id}0`,
          formulas,
        }),
        makeNode({
          id: `${id}1`,
          formulas,
        }),
      ]
    })
    this.draftState.justifications[this.draftState.nextRow] = {
      rule: '',
      parentRow: '',
    }
    this.draftState.nextRow += formulaCount
  }

  markContradiction(nodeId: string) {
    const draftNode = getNode(this.draftState.tree, nodeId) as FormulaNode
    draftNode.forest = [makeContradictionNode(draftNode.id)]
  }

  markFinished(nodeId: string) {
    const draftNode = getNode(this.draftState.tree, nodeId) as FormulaNode
    draftNode.forest = [makeFinishedNode(nodeId)]
  }

  reopenBranch(nodeId: string) {
    const draftNode = getNode(this.draftState.tree, nodeId) as FormulaNode
    draftNode.forest = []
  }
}

export const getInitialState = (premises: string): RudolfStore => {
  const premiseArray = premises.split(',')
  return {
    tree: parsePremises(premiseArray),
    nextRow: premiseArray.length + 1,
    justifications: {},
  }
}

export const RudolfReducerFunction: ImmerReducerFunction<typeof RudolfReducerClass> = createReducerFunction(
  RudolfReducerClass
)

export const {
  continueBranch,
  createTree,
  markContradiction,
  markFinished,
  reopenBranch,
  splitBranch,
  toggleResolved,
  updateContradiction,
  updateFormula,
  updateJustification,
} = createActionCreators(RudolfReducerClass)
export type RudolfAction = Actions<typeof RudolfReducerClass>
export type CustomDispatch = Dispatch<RudolfAction>
