import './PremisesSelector.css'

import React, { ChangeEventHandler } from 'react'

type Props = {
  onChange: (premises: string) => void
}

const PremisesSelector: React.FC<Props> = ({ onChange }) => {
  const handleSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const premises: string = event.currentTarget.value
    onChange(premises)
  }

  return (
    <select onChange={handleSelect} onBlur={handleSelect}>
      <option value="P->Q,P,~Q">Modus Ponens</option>
      <option value="~(P\/Q),~P\/~Q">De Morgen&apos;s Law</option>
    </select>
  )
}

export default PremisesSelector
