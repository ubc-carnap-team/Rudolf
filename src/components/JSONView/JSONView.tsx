import { TextareaAutosize } from '@material-ui/core'
import React, { FC, useEffect, useState } from 'react'

import {
  RudolfStore,
  updateFeedback,
  CustomDispatch,
} from '../../RudolfReducer'
import {
  SequentNode,
  FeedbackNode,
  CheckerFeedback,
} from '../../typings/Checker'
import { JustificationMap } from '../../typings/TreeState'
import { convertToSequent } from '../../util/carnapAdapter'
import useJSS from './style'

export const checkSequent = async (
  sequent: SequentNode
): Promise<FeedbackNode> => {
  return new Promise((resolve, reject) => {
    try {
      window.Carnap.checkIchikawaJenkinsSLTableau(
        sequent,
        (result: FeedbackNode) => {
          resolve(result)
        }
      )
    } catch (error) {
      reject(error)
    }
  })
}

const checkTree = async (
  tree: any,
  justifications: JustificationMap
): Promise<CheckerFeedback> => {
  const sequent = convertToSequent(tree, justifications)
  const feedbackTree: FeedbackNode = await checkSequent(sequent)
  return { sequent, feedbackTree }
}
export const JSONView: FC<RudolfStore & { dispatch: CustomDispatch }> = ({
  tree,
  justifications,
  feedback,
  dispatch,
}) => {
  useEffect(() => {
    if (window.Carnap) {
      checkTree(tree, justifications)
        .then((res: CheckerFeedback) => {
          return dispatch(updateFeedback(res))
        })
        .catch(({ message }: Error) => {
          return dispatch(updateFeedback({ errorMessage: message }))
        })
    }
  }, [dispatch, justifications, tree])
  const classes = useJSS()
  const [open, setOpen] = useState(false)
  return (
    <div className={classes.Bounder}>
      <div
        className={classes.Toggle}
        onClick={() => {
          setOpen(!open)
        }}
      >
        {open ? 'close' : 'open'}
      </div>
      <TextareaAutosize
        className={classes.TextArea}
        value={JSON.stringify({ tree, justifications, feedback })}
        style={{
          maxHeight: open ? '50vh' : '0vh',
        }}
      />
    </div>
  )
}
