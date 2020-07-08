import { IconButton } from '@material-ui/core'
import { Redo, Undo } from '@material-ui/icons'
import React, { useReducer, useState } from 'react'

import {
  createTree,
  initialPremises,
  initialState,
  rudolfReducer,
} from '../RudolfReducer'
import { makeUndoable } from '../undoableReducer'
import { JSONView } from './JSONView'
import NodeView from './NodeView'
import PremiseInput from './PremiseInput'
import PremisesSelector from './PremisesSelector'
import { ArcherContainer } from 'react-archer'

const App: React.FC = (): JSX.Element => {
  const [premises, setPremises] = useState(initialPremises)
  const [[pastStates, currentState, futureStates], dispatch] = useReducer(
    ...makeUndoable(rudolfReducer, initialState)
  )

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
      <ArcherContainer
        arrowLength={0}
        style={{ zIndex: 1 }}
        svgContainerStyle={{ zIndex: -1 }}
        strokeColor="black"
        noCurves={false}
      >
        <NodeView
          node={currentState.tree}
          dispatch={dispatch}
          justifications={currentState.justifications}
          feedbackMap={currentState.feedback.feedback}
        />
      </ArcherContainer>
      <JSONView {...{ ...currentState, dispatch }} />
    </main>
  )
}

export default App
