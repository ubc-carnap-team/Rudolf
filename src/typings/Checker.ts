export type Checker = (
  sequent: SequentNode,
  callback: (feedback: FeedbackNode) => any
) => void

export interface SequentNode {
  label: string
  rule: string
  forest: SequentNode[]
  id?: string
}

// the success case here means that the parsing and the
export type CheckerFeedbackSuccess = {
  success: true
  sequent: SequentNode
  feedback?: FeedbackMap
}

export type CheckerFeedbackFailure = {
  success: false
  errorMessage: string
}

export type CheckerFeedback = CheckerFeedbackSuccess | CheckerFeedbackFailure

export type FeedbackNode = {
  class: string
  info: string
  forest: FeedbackNode[]
}

export type FeedbackMessage = Omit<FeedbackNode, 'forest'>

export type FeedbackMap = { [id: string]: FeedbackMessage | undefined }
