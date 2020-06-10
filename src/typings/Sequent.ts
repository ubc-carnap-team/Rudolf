export interface SequentNode {
  label: string
  rule: string
  forest: SequentNode[]
}

export type CheckerFeedback =
  | {
      success: true
      feedbackTree: FeedbackNode
      sequent: SequentNode
    }
  | { success: false; errorMessage: string }

export interface FeedbackMessage {
  status: 'correct' | 'incorrect' | 'parsing'
  message: string
}

export interface FeedbackNode {
  feedback: FeedbackMessage[]
  forest: FeedbackNode[]
}
