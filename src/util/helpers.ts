import { FeedbackByRow, FeedbackMap } from '../typings/Checker'
import { TreeNode } from '../typings/TreeState'

export const isEmptyArray = <T>(
  maybeArray: Array<T> | string
): maybeArray is [] => Array.isArray(maybeArray) && maybeArray.length === 0

export const lastEl = <T>(arr: T[]) => arr[arr.length - 1]

/**
 * @param start start of array (inclusive)
 * @param stop end of array (exclusive)
 * @returns Array of integers from start to stop.
 * if start >= stop, returns empty array
 */
export const range = (start: number, stop: number): number[] => {
  if (start < stop) {
    return [start, ...range(start + 1, stop)]
  } else {
    return []
  }
}

const getChildFeedback = (
  node: TreeNode,
  feedback: FeedbackMap
): FeedbackByRow => {
  if (node.nodeType === 'formulas') {
    if (node.forest.length > 1) {
      return {
        ...getFeedbackByRow(node.forest[0], feedback),
        ...getFeedbackByRow(node.forest[1], feedback),
      }
    } else if (node.forest.length > 0) {
      return getFeedbackByRow(node.forest[0], feedback)
    } else {
      return {}
    }
  } else {
    return {}
  }
}

export const getFeedbackByRow = (
  node: TreeNode,
  feedback: FeedbackMap
): FeedbackByRow => {
  return {
    [node.formulas[0].row]: feedback[node.id],
    ...getChildFeedback(node, feedback),
  }
}

export const isAllFeedbackCorrect = (feedbackByRow: any) => {
  for (const i of Object.keys(feedbackByRow)) {
    if (
      !feedbackByRow[Number(i)] ||
      !feedbackByRow[Number(i)].class ||
      feedbackByRow[Number(i)].class !== 'correct'
    ) {
      return false
    }
  }
  return true
}
