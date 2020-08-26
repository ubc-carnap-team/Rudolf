import Rudolf from './components/Rudolf'
import ReactDOM from 'react-dom'
import React from 'react'
import './styles/_main.scss'

export const createTree = (selector: string) => {
  ReactDOM.render(React.createElement(Rudolf), document.querySelector(selector))
}
