import React, { FormEventHandler } from 'react'

type Props = {
  onSubmit: (premises: string) => void
  premises: string
  setPremises: (premises: string) => void
}

const PremiseInput: React.FC<Props> = ({ onSubmit, premises, setPremises }) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    onSubmit(premises)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="premises"
        aria-label="Enter Premises"
        value={premises}
        onChange={(event) => setPremises(event.target.value)}
      />
      <button>Declare Premises</button>
    </form>
  )
}

export default PremiseInput
