import { Reducer } from 'react'

type TrackedChanges<S> = [S[], S, S[]]

export const makeUndoable = <S, A extends { type: string }>(
  innerReducer: Reducer<S, A>,
  initialState: S
): [
  Reducer<TrackedChanges<S>, A | { type: 'UNDO' } | { type: 'REDO' }>,
  TrackedChanges<S>
] => [
  (
    [past, present, future]: [S[], S, S[]],
    action: A | { type: 'UNDO' } | { type: 'REDO' }
  ) => {
    switch (action.type) {
      case 'UNDO':
        const [previous, ...ancientHistory] = past
        return [ancientHistory, previous, [present, ...future]]
      case 'REDO':
        const [next, ...distantFuture] = future
        return [[present, ...past], next, distantFuture]
      default:
        return [[present, ...past], innerReducer(present, action as A), []]
    }
  },
  [[], initialState, []],
]
