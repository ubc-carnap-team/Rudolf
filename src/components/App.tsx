import { IconButton } from '@material-ui/core'
import { Redo, Undo } from '@material-ui/icons'
import React, { useReducer, useState } from 'react'

import { createTree, initialPremises, initialState, rudolfReducer } from '../RudolfReducer'
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

  const [canHighlight, setCanHighlight] = useState(false)
  const [highlightCount, setHighlightCount] = useState(0)

  // const rowArray: number[] = []
  // //const [rowValues, setRowValues] = useState(rowArray)

  // const rowValues = []

  // function addRow(element: number) {
  //   setRowValues((prevArray) => [...prevArray, element])
  // }

  function toggleHighlight() {
    setCanHighlight(true)
  }

  function resetHighlight() {
    setCanHighlight(false)
    setHighlightCount(0)
  }

  function incrementHighlight() {
    setHighlightCount(highlightCount + 1)
  }

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
        canHighlight={canHighlight}
        toggleHighlight={toggleHighlight}
        highlightCount={highlightCount}
        incrementHighlight={incrementHighlight}
        resetHighlight={resetHighlight}
      />
      <JSONView tree={currentState.tree} />
    </main>
  )
}

export default App
