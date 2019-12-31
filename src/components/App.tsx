import React, { useState, useReducer } from 'react'

import NodeView from './NodeView'
import PremiseInput from './PremiseInput'
import PremisesSelector from './PremisesSelector'
import { IconButton } from '@material-ui/core'
import { Undo, Redo } from '@material-ui/icons'
import { JSONView } from './JSONView'
import {
  initialPremises,
  initialState,
  rudolfReducer,
  createTree,
} from '../RudolfReducer'

const App: React.FC = (): JSX.Element => {
  const [premises, setPremises] = useState(initialPremises)
  const [state, dispatch] = useReducer(rudolfReducer, initialState)

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
        <IconButton className="undo-button" disabled={true}>
          <Undo />
        </IconButton>
        <IconButton className="redo-button" disabled={true}>
          <Redo />
        </IconButton>
      </span>
      <NodeView node={state.tree} nextRow={state.nextRow} dispatch={dispatch} />
      <JSONView tree={state.tree} />
    </main>
  )
}

export default App
