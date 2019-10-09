import './PremiseInput.css'

import React, { FormEventHandler } from 'react'

type Props = {
  onSubmit: (premises: string) => void
  defaultPremises: string
}

const PremiseInput: React.FC<Props> = ({ onSubmit, defaultPremises }) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    console.log(event)
    const premises: string = (event.currentTarget as any)[0].value
    onSubmit(premises)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="premises"
        aria-label="Enter Premises"
        defaultValue={defaultPremises}
        onSubmit={(event) => {
          console.log('input submit handler', event)
        }}
      />
      <button>Declare Premises</button>
    </form>
  )
}

export default PremiseInput
