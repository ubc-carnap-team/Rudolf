import '../styles/all.scss'

import { IconButton } from '@material-ui/core'
import { Redo, Undo } from '@material-ui/icons'
import React, { FC, useEffect, useReducer, useRef, useState } from 'react'
import { ArcherContainer } from 'react-archer'

import {
  createTree,
  getInitialState,
  RudolfReducerFunction,
} from '../RudolfReducer'
import appJSS from '../styles/App_styles'
import feedbackJSS from '../styles/feedback_styles'
import { makeUndoable } from '../undoableReducer'
import { checkTree } from '../util/carnapAdapter'
import PremiseInput from './PremiseInput'
import RudolfFeedback from './RudolfFeedback'
import TruthTree from './TruthTree'
import { Checker, CheckerFeedback } from '../typings/Checker'
import { DebugInfo } from './DebugInfo'

type Props = {
  initialPremises?: string
  checker: string | Checker
  debug?: boolean
}

const Rudolf: FC<Props> = ({
  initialPremises = '',
  checker,
  debug = false,
}): JSX.Element => {
  const [premises, setPremises] = useState(initialPremises)
  const [[pastStates, treeState, futureStates], dispatch] = useReducer(
    ...makeUndoable(RudolfReducerFunction, getInitialState(premises))
  )
  const [feedback, setFeedback] = useState<CheckerFeedback>({
    success: true,
    feedback: {},
    sequent: { label: premises, forest: [], rule: '' },
  })

  const handleSubmitPremises = (rawInput: string) => {
    setPremises(rawInput)
    const premiseArray = rawInput.split(',')
    dispatch(createTree(premiseArray))
  }

  const { tree, justifications } = treeState

  // coerce checker function to either a function or undefined
  const checkerFunction: Checker | undefined =
    typeof checker === 'function' ? checker : window.Carnap?.[checker]

  useEffect((): void => {
    if (typeof checkerFunction === 'function') {
      checkTree(tree, justifications, checkerFunction)
        .then(({ feedback, sequent }) =>
          setFeedback({ success: true, sequent, feedback })
        )
        .catch(({ message }: Error) =>
          setFeedback({ success: false, errorMessage: message })
        )
    } else if (window.Carnap) {
      // Carnap object exists but the provided checker name doesn't produce a function.
      console.error(
        `The name ${checker} is not defined as a function on the Carnap object. ${Carnap}`
      )
    } else {
      console.warn(
        'The Carnap global variable is not defined or does not contain an object. Skipping Check.'
      )
    }
  }, [tree, justifications, checker, checkerFunction])

  const classes = appJSS()
  const feedbackClasses = feedbackJSS()
  const topItemsRef = useRef<HTMLDivElement>(null)
  return (
    <main className={`${classes.AppBounder} rudolf`}>
      <div className={classes.TopItemsBounder} ref={topItemsRef}>
        {/* <PremisesSelector onChange={handleSubmitPremises} /> */}
        <PremiseInput
          premises={premises}
          onSubmit={handleSubmitPremises}
          setPremises={setPremises}
        />
        <RudolfFeedback treeState={treeState} />
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
          <TruthTree {...{ treeState, dispatch, feedback }} />
        </ArcherContainer>
      </div>
      {debug && <DebugInfo {...{ ...treeState, feedback }} />}
    </main>
  )
}

export default Rudolf
