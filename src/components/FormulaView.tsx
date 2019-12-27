import React, { FC } from 'react'
import { Check } from '@material-ui/icons'

interface Props {
  row: number
  value: string
  resolved: boolean
}

const FormulaView: FC<Props> = ({ row, value, resolved }) => (
  <div className="formula node">
    <span>{row}</span>
    <input
      className="label"
      // TODO
      //   onChange={handleFormulaChange}
      value={value}
      placeholder="formula"
    />
    {resolved ? <Check /> : ''}
  </div>
)

export default FormulaView
