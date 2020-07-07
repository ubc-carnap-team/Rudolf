import { IconButton } from '@material-ui/core'
import { Redo, Undo } from '@material-ui/icons'
import React, { useEffect, useReducer, useState } from 'react'

import {
  createTree,
  initialPremises,
  initialState,
  rudolfReducer,
  updateWindowSize,
} from '../RudolfReducer'
import { makeUndoable } from '../undoableReducer'
import { JSONView } from './JSONView'
import NodeView from './NodeView'
import PremiseInput from './PremiseInput'
import PremisesSelector from './PremisesSelector'

const App: React.FC = (): JSX.Element => {
  const [premises, setPremises] = useState(initialPremises)
  const [[pastStates, currentState, futureStates], dispatch] = useReducer(
    ...makeUndoable(rudolfReducer, initialState)
  )
  useEffect(() => {
    const updater: typeof window.onresize = () => {
      dispatch(updateWindowSize())
    }
    window.onresize = updater
    return () => {
      if ((window.onresize = updater)) {
        window.onresize = null
      }
    }
  }, [])

  const handleSubmitPremises = (rawInput: string) => {
    setPremises(rawInput)
    const premiseArray = rawInput.split(',')
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
      <NodeView
        node={currentState.tree}
        dispatch={dispatch}
        justifications={currentState.justifications}
        feedbackMap={currentState.feedback.feedback}
        windowSize={currentState.windowSize}
      />
      <JSONView {...{ ...currentState, dispatch }} />
    </main>
  )
}

export default App
