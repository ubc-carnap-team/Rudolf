import React from 'react'
import ReactDOM from 'react-dom'
import Rudolf from './Rudolf'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Rudolf
      initialPremises="P,Q,R,S"
      checker={'checkIchikawaJenkinsSLTableau'}
    />,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
