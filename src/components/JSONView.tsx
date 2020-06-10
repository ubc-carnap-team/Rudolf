import { TextareaAutosize } from '@material-ui/core'
import React, { FC, useEffect } from 'react'

import { RudolfStore, updateFeedback, CustomDispatch } from '../RudolfReducer'
import { SequentNode, FeedbackNode, CheckerFeedback } from '../typings/Checker'
import { JustificationMap } from '../typings/TreeState'
import { convertToSequent } from '../util/carnapAdapter'

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
  return { feedbackTree, sequent }
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
  return (
    <TextareaAutosize
      className="json-view"
      value={JSON.stringify({ tree, justifications, feedback })}
      style={{
        overflow: 'hidden scroll',
        fontSize: '16px',
        minWidth: '100%',
        position: 'fixed',
        bottom: 0,
        maxHeight: '50%',
      }}
    />
  )
}
