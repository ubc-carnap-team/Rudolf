import '../styles/all.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { IconButton } from '@material-ui/core'
import { Redo, Undo } from '@material-ui/icons'
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { ArcherContainer } from 'react-archer'

import {
  createTree,
  initialState,
  rudolfReducer,
  updateFeedback,
} from '../RudolfReducer'
import appJSS from '../styles/App_styles'
import feedbackJSS from '../styles/feedback_styles'
import { Checker } from '../typings/Checker'
import { makeUndoable } from '../undoableReducer'
import { checkTree } from '../util/carnapAdapter'
import PremiseInput from './PremiseInput'
import RudolfFeedback from './RudolfFeedback'
import TruthTree from './TruthTree'

const Rudolf: React.FC<{ initialPremises?: string; checker: Checker }> = ({
  initialPremises = '',
  checker,
}): JSX.Element => {
  const [premises, setPremises] = useState(initialPremises)
  const [[pastStates, currentState, futureStates], dispatch] = useReducer(
    ...makeUndoable(rudolfReducer, initialState(premises))
  )

  const handleSubmitPremises = (rawInput: string) => {
    setPremises(rawInput)
    const premiseArray = rawInput.split(',')
    dispatch(createTree(premiseArray))
  }

  const { tree, justifications, feedback } = currentState

  useEffect(() => {
    if (window.Carnap) {
      checkTree(tree, justifications, checker)
        .then(({ feedback }) => {
          return dispatch(updateFeedback({ success: true, feedback }))
        })
        .catch(({ message }: Error) => {
          return dispatch(
            updateFeedback({ success: false, errorMessage: message })
          )
        })
    }
  }, [dispatch, justifications, tree, checker])
  const classes = appJSS()
  const feedbackClasses = feedbackJSS()
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
        className={`${classes.TreeBounder} ${
          feedback.success ? '' : feedbackClasses.Incorrect
        }`}
      >
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
      <RudolfFeedback currentState={currentState} />
    </main>
  )
}

export default Rudolf
