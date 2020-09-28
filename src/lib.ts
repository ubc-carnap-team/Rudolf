import Rudolf from './components/Rudolf'
import ReactDOM from 'react-dom'
import React from 'react'

export const createTree = (
  elementId: string,
  initialPremises: string,
  checker: typeof Carnap.checkIchikawaJenkinsSLTableau = Carnap.checkIchikawaJenkinsSLTableau
) => {
  ReactDOM.render(
    React.createElement(Rudolf, { initialPremises, checker }),
    document.getElementById(elementId)
  )
}
