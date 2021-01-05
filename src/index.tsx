import * as serviceWorker from './serviceWorker'
import { createTrees, WidgetProps } from './lib'

const initialPremises = 'P->Q,P,~Q'

const trees: WidgetProps[] = [
  {
    elementId: 'problem-1.1',
    initialPremises,
    checker: Carnap.checkIchikawaJenkinsSLTableau,
  },
  { elementId: 'problem-1.2', initialPremises: '' },
]

createTrees(trees)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
