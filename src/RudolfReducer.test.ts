import {
  continueBranch,
  getInitialState,
  RudolfReducerFunction,
} from './RudolfReducer'
import { TreeNode } from './typings/TreeState'
import { makeUndoable } from './undoableReducer'

const [reducer, initialState] = makeUndoable(
  RudolfReducerFunction,
  getInitialState('A & B')
)

const treeHeight = (root: TreeNode): number => {
  if (root.nodeType !== 'formulas' || root.forest.length === 0) {
    return 1
  } else if (root.forest.length === 1) {
    return treeHeight(root.forest[0]) + 1
  } else {
    return Math.max(...root.forest.map(treeHeight)) + 1
  }
}

describe('undo and redo', () => {
  expect(treeHeight(initialState[1].tree)).toBe(1)
  let state = reducer(initialState, continueBranch('', 2))
  expect(treeHeight(state[1].tree)).toBe(2)
  it('UNDO', () => {
    state = reducer(state, { type: 'UNDO' })
    expect(treeHeight(state[1].tree)).toBe(1)
  })

  it('REDO', () => {
    state = reducer(state, { type: 'REDO' })
    expect(treeHeight(state[1].tree)).toBe(2)
  })
})
