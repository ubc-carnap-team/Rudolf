import React, { ChangeEventHandler } from 'react'

type Props = {
  onChange: (premises: string) => void
}

const PremisesSelector: React.FC<Props> = ({ onChange }) => {
  const handleSubmit: ChangeEventHandler<HTMLSelectElement> = (event) => {
    event.preventDefault()
    const premises: string = event.currentTarget.value
    onChange(premises)
  }

  return (
    <select onChange={handleSubmit}>
      <option value="P->Q,P,~Q">Basic Example</option>
      <option value="P->Q">Modus Ponens</option>
      <option value="~PvQ">De Morgen&apos;s Law</option>
    </select>
  )
}

export default PremisesSelector
