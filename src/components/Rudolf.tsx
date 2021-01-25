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
import { makeUndoable } from '../undoableReducer'
import { checkTree } from '../util/carnapAdapter'
import PremiseInput from './PremiseInput'
import RudolfFeedback from './RudolfFeedback'
import TruthTree from './TruthTree'
import { Checker } from '../typings/Checker'

type Props = { initialPremises?: string; checker: string | Checker }

const Rudolf: React.FC<Props> = ({
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

  useEffect((): void => {
    const handleCheck = async (
      tree: any,
      justifications: any,
      checkerFunction: Checker
    ) =>
      checkTree(tree, justifications, checkerFunction)
        .then(({ feedback }) => {
          return dispatch(updateFeedback({ success: true, feedback }))
        })
        .catch(({ message }: Error) => {
          return dispatch(
            updateFeedback({ success: false, errorMessage: message })
          )
        })

    const carnapObject = window?.Carnap
    if (typeof checker === 'function') {
      handleCheck(tree, justifications, checker)
    } else if (carnapObject) {
      const checkerFunction = carnapObject[checker]
      if (typeof checkerFunction == 'function') {
        handleCheck(tree, justifications, checkerFunction)
      } else {
        console.error(
          `The name ${checker} is not defined as a function on the Carnap client object. ${Carnap}`
        )
      }
    } else {
      console.warn(
        'The Carnap global variable is not defined or does not contain an object. Skipping Check.'
      )
    }
  }, [tree, justifications, checker])

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
        <RudolfFeedback currentState={currentState} />
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
    </main>
  )
}

export default Rudolf
