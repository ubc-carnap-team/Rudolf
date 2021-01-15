import React from 'react'
import ReactDOM from 'react-dom'

import Rudolf from './components/Rudolf'
import { Checker } from './typings/Checker'

export type WidgetProps = {
  elementId: string
  initialPremises: string
  checker?: Checker
}

export const createTree = (
  elementId: string,
  initialPremises: string,
  checker: Checker = Carnap.checkIchikawaJenkinsSLTableau
) => {
  ReactDOM.render(
    React.createElement(Rudolf, { initialPremises, checker }),
    document.getElementById(elementId)
  )
}

export const createTrees = (props: WidgetProps[]) => {
  props.forEach(({ elementId, initialPremises, checker }) => {
    createTree(elementId, initialPremises, checker)
  })
}
