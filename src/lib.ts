// import './styles/all.css'

import Rudolf from './components/Rudolf'
import ReactDOM from 'react-dom'
import React from 'react'

export const createTree = (elementId: string, initialPremises: string) => {
  ReactDOM.render(
    React.createElement(Rudolf, { initialPremises }),
    document.getElementById(elementId)
  )
}
