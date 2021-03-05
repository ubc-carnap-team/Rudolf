import React from 'react'
import ReactDOM from 'react-dom'

import Rudolf from './components/Rudolf'
import { Checker } from './typings/Checker'

export type WidgetProps = {
  elementId: string
  initialPremises: string
  checker?: string
  debug?: boolean
}

// TODO, update this to use object with named arguments. This is silly.
export const createTree = (
  elementId: string,
  initialPremises: string,
  checker: Checker | string = 'checkIchikawaJenkinsSLTableau',
  debug = false
) => {
  ReactDOM.render(
    React.createElement(Rudolf, { initialPremises, checker, debug }),
    document.getElementById(elementId)
  )
}

export const createTrees = (props: WidgetProps[]) => {
  props.forEach(
    ({
      elementId,
      initialPremises,
      checker = 'checkIchikawaJenkinsSLTableau',
      debug = false,
    }) => {
      createTree(elementId, initialPremises, checker, debug)
    }
  )
}
