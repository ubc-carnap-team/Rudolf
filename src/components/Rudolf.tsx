import { IconButton } from '@material-ui/core'
import { Redo, Undo } from '@material-ui/icons'
import React, { useReducer, useState, useRef, useEffect } from 'react'

import {
  createTree,
  initialPremises,
  initialState,
  rudolfReducer,
  updateFeedback,
} from '../RudolfReducer'
import { makeUndoable } from '../undoableReducer'
import { JSONView } from './JSONView'
import PremiseInput from './PremiseInput'
import { ArcherContainer } from 'react-archer'
import appJSS from '../styles/App_styles'
import TruthTree from './TruthTree'
import { checkTree } from '../util/carnapAdapter'

const Rudolf: React.FC = (): JSX.Element => {
  const [premises, setPremises] = useState(initialPremises)
  const [[pastStates, currentState, futureStates], dispatch] = useReducer(
    ...makeUndoable(rudolfReducer, initialState)
  )

  const handleSubmitPremises = (rawInput: string) => {
    setPremises(rawInput)
    const premiseArray = rawInput.split(',')
    dispatch(createTree(premiseArray))
  }

  const { tree, justifications } = currentState

  useEffect(() => {
    if (window.Carnap) {
      checkTree(tree, justifications)
        .then(({ sequent, feedback }) => {
          return dispatch(updateFeedback({ feedback, sequent }))
        })
        .catch(({ message }: Error) => {
          return dispatch(updateFeedback({ errorMessage: message }))
        })
    }
  }, [dispatch, justifications, tree])
  const classes = appJSS()
  const topItemsRef = useRef<HTMLDivElement>(null)
  return (
    <main className={classes.AppBounder}>
      <div className={classes.TopItemsBounder} ref={topItemsRef}>
        {/* <PremisesSelector onChange={handleSubmitPremises} /> */}
        <PremiseInput
          premises={premises}
          onSubmit={handleSubmitPremises}
          setPremises={setPremises}
        />
        <span className="tree-buttons">
          <IconButton
            aria-label="Undo"
            className="undo-button"
            onClick={() => {
              dispatch({ type: 'UNDO' })
            }}
            disabled={!pastStates.length}
          >
            <Undo />
          </IconButton>
          <IconButton
            aria-label="Redo"
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
        style={{
          top: topItemsRef.current?.offsetHeight,
          position: topItemsRef.current ? 'absolute' : 'static',
        }}
      >
        <div className={classes.Tree}>
          <ArcherContainer
            arrowLength={0}
            style={{ zIndex: 1 }}
            svgContainerStyle={{ zIndex: -1 }}
            strokeColor="black"
            noCurves={false}
          >
            <TruthTree currentState={currentState} dispatch={dispatch} />
          </ArcherContainer>
        </div>
      </div>
      <JSONView {...{ ...currentState, dispatch }} />
    </main>
  )
}

export default Rudolf
