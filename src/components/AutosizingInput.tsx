import React, { useState, ChangeEvent } from 'react'
import CSS from 'csstype'

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  value: string
  placeholder: string
  style?: CSS.Properties
}

function AutosizingInput({ onChange, value, placeholder, style }: Props) {
  const [width, setWidth] = useState(
    `${Math.max(
      1,
      (value.length !== 0 ? value.length : placeholder.length) * (3 / 4)
    )}em`
  )
  return (
    <input
      style={Object.assign({ width }, style)}
      onChange={(e) => {
        onChange(e)
        setWidth(`${Math.max(1, e.currentTarget.value.length * (3 / 4))}em`)
      }}
      value={value}
      placeholder={placeholder}
    />
  )
}

export default AutosizingInput
