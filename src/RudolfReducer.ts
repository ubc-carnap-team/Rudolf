import {
  Actions,
  createActionCreators,
  createReducerFunction,
  ImmerReducer,
  ImmerReducerFunction,
} from 'immer-reducer'
import { Dispatch } from 'react'

import { CheckerFeedback } from './typings/Checker'
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

export type RudolfStore = {
  tree: FormulaNode
  nextRow: number
  justifications: JustificationMap
  feedback: CheckerFeedback
}

export class RudolfReducer extends ImmerReducer<RudolfStore> {
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

  updateFeedback(feedback: CheckerFeedback) {
    this.draftState.feedback = feedback
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

export const initialState = (premises: string): RudolfStore => {
  const premiseArray = premises.split(',')
  return {
    tree: parsePremises(premiseArray),
    nextRow: premiseArray.length + 1,
    justifications: {},
    feedback: { errorMessage: 'Nothing yet.' },
  }
}

export const rudolfReducer: ImmerReducerFunction<typeof RudolfReducer> = createReducerFunction(
  RudolfReducer
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
  updateFeedback,
  updateFormula,
  updateJustification,
} = createActionCreators(RudolfReducer)
export type RudolfAction = Actions<typeof RudolfReducer>
export type CustomDispatch = Dispatch<RudolfAction>
