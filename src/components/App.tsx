import React, { useState, useReducer } from 'react'

import NodeView from './NodeView'
import PremiseInput from './PremiseInput'
import PremisesSelector from './PremisesSelector'
import { IconButton } from '@material-ui/core'
import { Undo, Redo } from '@material-ui/icons'
import {
  initialPremises,
  initialState,
  rudolfReducer,
  createTree,
} from '../RudolfReducer'
import { makeUndoable } from '../undoableReducer'
import { JSONView } from './JSONView'

const App: React.FC = (): JSX.Element => {
  const [premises, setPremises] = useState(initialPremises)
  const [[pastStates, currentState, futureStates], dispatch] = useReducer(
    ...makeUndoable(rudolfReducer, initialState)
  )

  const handleSubmitPremises = (rawInput: string) => {
    setPremises(rawInput)
    const premiseArray = premises.split(',')
    dispatch(createTree(premiseArray))
  }

  return (
    <main className="App">
      <PremisesSelector onChange={handleSubmitPremises} />
      <PremiseInput
        premises={premises}
        onSubmit={handleSubmitPremises}
        setPremises={setPremises}
      />
      <span className="tree-buttons">
        <IconButton
          className="undo-button"
          onClick={() => {
            dispatch({ type: 'UNDO' })
          }}
          disabled={!pastStates.length}
        >
          <Undo />
        </IconButton>
        <IconButton
          className="redo-button"
          onClick={() => {
            dispatch({ type: 'REDO' })
          }}
          disabled={!futureStates.length}
        >
          <Redo />
        </IconButton>
      </span>
      <NodeView node={currentState.tree} dispatch={dispatch} />
      <JSONView tree={currentState.tree} />
    </main>
  )
}

export default App
