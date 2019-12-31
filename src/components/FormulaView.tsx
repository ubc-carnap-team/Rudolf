import React, { FC, useState, useRef, Ref, ChangeEventHandler } from 'react'
import { Check } from '@material-ui/icons'
import { CustomDispatch, updateFormula } from '../RudolfReducer'
import { NodeMenu } from './NodeMenu'

interface Props {
  row: number
  value: string
  resolved: boolean
  nodeId: string
  index: number
  dispatch: CustomDispatch
}

const FormulaView: FC<Props> = ({
  index,
  nodeId,
  row,
  value,
  resolved,
  dispatch,
}) => {
  const [contextMenu, setContextMenu] = useState(false)
  const ref: Ref<HTMLDivElement> = useRef(null)
  const handleFormulaChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    dispatch(updateFormula(nodeId, index, event.currentTarget.value))
  return (
    <div
      className="formula node"
      ref={ref}
      onContextMenu={(e) => {
        e.preventDefault()
        setContextMenu(true)
      }}
    >
      <span>{row}</span>
      <input
        className="label"
        onChange={handleFormulaChange}
        value={value}
        placeholder="formula"
      />
      <NodeMenu
        open={contextMenu}
        onClose={() => setContextMenu(false)}
        dispatch={dispatch}
        anchorEl={ref.current as HTMLDivElement}
        index={index}
        nodeId={nodeId}
        formula={{ row, value, resolved }}
      />
      {resolved ? <Check /> : ''}
    </div>
  )
}

export default FormulaView
