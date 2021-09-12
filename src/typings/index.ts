import { CustomDispatch, RudolfStore } from '../RudolfReducer'
import { CheckerFeedback } from './Checker'

export interface DefaultProps {
  treeState: RudolfStore
  dispatch: CustomDispatch
  feedback: CheckerFeedback
}
