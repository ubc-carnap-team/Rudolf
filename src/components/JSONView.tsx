import React, { FC, useState, useEffect } from 'react'
import { TextareaAutosize } from '@material-ui/core'
import { JustificationMap } from '../typings/TreeState'
import { convertToSequent } from '../util/carnapAdapter'
import { SequentNode } from '../typings/Sequent'
import { RudolfStore } from '../RudolfReducer'

export const checkSequent = async (sequent: SequentNode) => {
  return new Promise((resolve, reject) => {
    try {
      window.Carnap.checkIchikawaJenkinsSLTableau(
        sequent,
        (result: unknown) => {
          resolve(result)
        }
      )
    } catch (err) {
      reject(err)
    }
  })
}

const safeConvertToSequent = async (
  tree: any,
  justifications: JustificationMap
): Promise<string> => {
  try {
    const sequent = convertToSequent(tree, justifications)
    const feedback = await checkSequent(sequent)
    return JSON.stringify({
      tree,
      sequent,
      feedback,
    })
  } catch (err) {
    console.log(err)
    return JSON.stringify({ tree, err })
  }
}

export const JSONView: FC<RudolfStore> = ({ tree, justifications }) => {
  const [feedback, updateFeedback] = useState('')
  useEffect(() => {
    safeConvertToSequent(tree, justifications)
      .then((res: string) => {
        return updateFeedback(res)
      })
      .catch(console.error.bind(globalThis))
  })
  return (
    <TextareaAutosize
      className="json-view"
      value={feedback}
      style={{
        overflow: 'hidden scroll',
        fontSize: '16px',
        minWidth: '100%',
        position: 'fixed',
        bottom: 0,
        maxHeight: '25%',
      }}
    />
  )
}
