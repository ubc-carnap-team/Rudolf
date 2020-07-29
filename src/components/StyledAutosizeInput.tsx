import React, { ChangeEvent } from 'react'
import AutosizeInput from 'react-input-autosize'
import CSS from 'csstype'

type Props = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  value: string
  placeholder: string
  style?: CSS.Properties
}

function StyledAutosizeInput({ onChange, value, placeholder, style }: Props) {
  return (
    <AutosizeInput
      style={Object.assign({}, style)}
      inputStyle={{
        padding: '0vmin .5vmin',
        backgroundColor: 'transparent',
        borderStyle: 'none',
      }}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  )
}

export default StyledAutosizeInput
