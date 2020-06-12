export interface SequentNode {
  label: string
  rule: string
  forest: SequentNode[]
}

export type CheckerFeedback =
  | {
      feedbackTree: FeedbackNode
      sequent: SequentNode
    }
  | { errorMessage: string }

export interface FeedbackMessage {
  status: 'correct' | 'incorrect' | 'parsing'
  message: string
}

export interface FeedbackNode {
  feedback: FeedbackMessage[]
  forest: FeedbackNode[]
}
