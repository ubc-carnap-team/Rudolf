import React, { ChangeEventHandler } from 'react'

type Props = {
  onChange: (premises: string) => void
}

const examples = [
  ['P->Q,P,~Q', 'Modus Ponens'],
  ['~(~(P\\/Q)<->(~P/\\~Q))', "De Morgen's Law"],
]

const PremisesSelector: React.FC<Props> = ({ onChange }) => {
  const handleSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const premises: string = event.currentTarget.value
    onChange(premises)
  }

  return (
    <select onChange={handleSelect} onBlur={handleSelect}>
      {examples.map(([value, name]) => (
        <option value={value} key={value}>
          {name}
        </option>
      ))}
    </select>
  )
}

export default PremisesSelector
