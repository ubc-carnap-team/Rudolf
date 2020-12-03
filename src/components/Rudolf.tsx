import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/all.css'

import { IconButton } from '@material-ui/core'
import { Redo, Undo } from '@material-ui/icons'
import React, { useReducer, useState, useEffect } from 'react'

import {
  createTree,
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
import feedbackJSS from '../styles/feedback_styles'
import { isAllFeedbackCorrect, getFeedbackByRow } from '../util/helpers'
import { FeedbackMap, Checker } from '../typings/Checker'

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
  let feedbackByRow: any
  let allFeedbackCorrect = false
  if (feedback.success) {
    feedbackByRow = getFeedbackByRow(tree, feedback.feedback as FeedbackMap)
    allFeedbackCorrect = isAllFeedbackCorrect(feedbackByRow)
  } else {
    feedbackByRow = {}
  }
  return (
    <main className={classes.AppBounder}>
      <div className={classes.TopItemsBounder}>
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
          allFeedbackCorrect
            ? feedbackClasses.Correct
            : feedbackClasses.Incorrect
        }`}
      >
        <ArcherContainer
          arrowLength={0}
          style={{ zIndex: 1 }}
          svgContainerStyle={{ zIndex: -1 }}
          strokeColor="black"
          noCurves={false}
        >
          <TruthTree
            currentState={currentState}
            dispatch={dispatch}
            feedbackByRow={feedbackByRow}
          />
        </ArcherContainer>
      </div>
      <JSONView {...{ ...currentState, dispatch }} />
    </main>
  )
}

export default Rudolf
