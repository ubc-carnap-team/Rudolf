export interface SequentNode {
  label: string
  rule: string
  forest: SequentNode[]
  id?: string
}

export type CheckerFeedbackSuccess = {
  success: true
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

export type FeedbackByRow = { [index: number]: FeedbackMessage | undefined }
