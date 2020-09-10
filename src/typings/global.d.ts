import { SequentNode, FeedbackNode } from './Checker'
declare global {
  const Carnap: {
    checkIchikawaJenkinsSLTableau: (
      sequent: SequentNode,
      callback: (feedback: FeedbackNode) => any
    ) => void
  }
  interface Window {
    Carnap: typeof Carnap
  }
}
