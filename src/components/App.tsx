import { IconButton } from '@material-ui/core'
import { Redo, Undo } from '@material-ui/icons'
import React, { useReducer, useState, useRef } from 'react'

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
import appJSS from '../styles/App_styles'

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
  const classes = appJSS()
  const topItemsRef = useRef<HTMLDivElement>(null)
  return (
    <main className={classes.AppBounder}>
      <div className={classes.TopItemsBounder} ref={topItemsRef}>
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
      </div>
      <div
        className={classes.TreeBounder}
        style={{ top: topItemsRef.current?.offsetHeight }}
      >
        <div className={classes.Tree}>
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
        </div>
      </div>
      <JSONView {...{ ...currentState, dispatch }} />
    </main>
  )
}

export default App
