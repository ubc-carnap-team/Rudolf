import React from 'react'
import ReactDOM from 'react-dom'

import Rudolf from './components/Rudolf'

export type WidgetProps = {
  elementId: string
  initialPremises: string
  checker?: string
}

export const createTree = (
  elementId: string,
  initialPremises: string,
  checker = 'checkIchikawaJenkinsSLTableau'
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
