import { createTrees, WidgetProps } from './lib'
import * as serviceWorker from './serviceWorker'

const initialPremises = 'Fa -> Fb'

const trees: WidgetProps[] = [
  {
    elementId: 'problem-1.1',
    initialPremises,
    checker: 'checkIchikawaJenkinsQLTableau',
  },
  {
    elementId: 'problem-1.2',
    checker: 'checkIchikawaJenkinsQLTableau',
    initialPremises: '',
  },
]

createTrees(trees)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
