export interface SequentNode {
  label: string
  rule: string
  forest: SequentNode[]
  id?: string
}

export type CheckerFeedback = {
  feedback?: FeedbackMap
  sequent?: SequentNode
  errorMessage?: string
}

export type FeedbackNode = {
  class: string
  info: string
  forest: FeedbackNode[]
}

export type FeedbackMessage = Omit<FeedbackNode, 'forest'>

export type FeedbackMap = { [id: string]: FeedbackMessage }
