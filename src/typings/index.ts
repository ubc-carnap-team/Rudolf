import { CustomDispatch, RudolfStore } from '../RudolfReducer'
import { CheckerFeedback } from './Checker'

export interface DefaultProps {
  currentState: RudolfStore
  dispatch: CustomDispatch
  feedback: CheckerFeedback
}
